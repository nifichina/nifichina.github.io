import org.apache.nifi.controller.ControllerService
import org.apache.nifi.dbcp.DBCPService
import org.apache.nifi.components.state.Scope
import org.apache.commons.io.IOUtils
import java.nio.charset.StandardCharsets
import java.lang.StringBuilder
import groovy.sql.Sql
// First:获取数据库组件及连接
def conn
def OracleDbcpConnPool
def lookup = context.controllerServiceLookup
// 根据id 获取Oracle ConnectionPoll
//conn = lookup.getControllerService(OracleConn.value)?.getConnection()
//自动查询当前Group下的名称为Oracle的DbcpConnectionPool
Set ids = lookup.getControllerServiceIdentifiers(DBCPService)
for(String id:ids){
    if(lookup.getControllerServiceName(id)=="OracleDBCPConnectionPool"){
        OracleDbcpConnPool = lookup.getControllerService(id)
        break
    }
} 
if(!OracleDbcpConnPool){
    log.error("获取数据库失败")
    return
}
conn = OracleDbcpConnPool?.getConnection()
if(!conn){
    log.error("数据库连接不可用")
    return
}
// Second:获取当前组件的状态存储管理器 存取SCN号
def stateManager = context.stateManager
def stateMap = stateManager.getState(Scope.CLUSTER)
def scn = stateMap.get('scn')
long step_size = Long.parseLong(STEP_SIZE.value)
//从视图中查询到的[结果]的最大scn号
String lastScn = ""
//当前视图中最大的scn号
String thisViewMaxScn = ""
// 结束LogMiner固定程序
String endLogMinerSql = "BEGIN DBMS_LOGMNR.END_LOGMNR;END;"
// 查询视图最小scn号
String selectMinScnSql = "SELECT MIN(SCN) as MIN FROM v\$logmnr_contents"
// 查询视图最大scn号
String selectMaxScnSql = "SELECT MAX(SCN) as MAX FROM v\$logmnr_contents"
def sql
try {
    sql = new Sql(conn)
    //添加日志SQL语句
    StringBuilder addLogFileSql = new StringBuilder()
    //查询线上redo log组，每组取一个日志文件读取
    sql.rows('SELECT * FROM (SELECT GROUP#,MEMBER,ROW_NUMBER() OVER(PARTITION BY GROUP# ORDER BY MEMBER) AS RN FROM v$logfile) WHERE RN <= 1').eachWithIndex { row, idx ->
        if(idx == 0){
            addLogFileSql.append("BEGIN DBMS_LOGMNR.ADD_LOGFILE(LOGFILENAME => \'${row.getProperty("MEMBER")}\', OPTIONS => DBMS_LOGMNR.NEW);")
            }else{
                addLogFileSql.append("DBMS_LOGMNR.ADD_LOGFILE(LOGFILENAME => \'${row.getProperty("MEMBER")}\', OPTIONS => DBMS_LOGMNR.ADDFILE);")
            }
    }
    addLogFileSql.append("END;")
    log.debug("执行${addLogFileSql.toString()}")
    sql.execute(addLogFileSql.toString())
    def startLogMinerSql 
    // 判断state中的scn是否存在 不存在的话进一步判断是否需要初始化时间和scn号
     boolean initScnConfig = false
    if(!scn){
        startLogMinerSql= new StringBuilder()
        String alterTimeFoemat = "ALTER SESSION SET NLS_DATE_FORMAT = \'${NLS_DATE_FORMAT.value.toString()}\'"
        startLogMinerSql.append("BEGIN DBMS_LOGMNR.START_LOGMNR(")
        def initScn = init_SCN.value?.toString()
        if("null"!= initScn){
            initScnConfig = true
            startLogMinerSql.append("STARTSCN => ${initScn},ENDSCN =>${Long.parseLong(initScn)+step_size},")
        }
        def initStartTime = init_STARTTIME.value?.toString()
        if("null"!= initStartTime){
            sql.execute(alterTimeFoemat)
            startLogMinerSql.append("STARTTIME => \'${initStartTime}\',")
        }
        def intEndTime = init_ENDTIME.value?.toString()
        if("null"!= intEndTime){
            sql.execute(alterTimeFoemat)
            startLogMinerSql.append("ENDTIME => \'${intEndTime}\',")
        }
        startLogMinerSql.append("OPTIONS => DBMS_LOGMNR.DICT_FROM_ONLINE_CATALOG + DBMS_LOGMNR.NO_SQL_DELIMITER  + DBMS_LOGMNR.NO_ROWID_IN_STMT + DBMS_LOGMNR.SKIP_CORRUPTION);END;")
        // 如果初始化，没有配置scn，避免第一次查询时间过长，只查询最小scn号保存state并结束本次调度
        if(!initScnConfig){
            log.debug("Auto Init the Scn")
            sql.execute(startLogMinerSql.toString())
            String thisViewMinScn = sql.rows(selectMinScnSql).get(0)?.getProperty("MIN")?.toString()
            log.debug("最小scn号："+thisViewMinScn)
            def newMap = ['scn':thisViewMinScn]
            stateManager.setState(newMap, Scope.CLUSTER);
            sql.execute(endLogMinerSql)
            return
        }
    }else{
        log.debug("本次SCN号"+scn)
        // StateMap存在scn号的启动语句
        startLogMinerSql = "BEGIN DBMS_LOGMNR.START_LOGMNR(STARTSCN => ${Long.parseLong(scn)+1},ENDSCN =>${Long.parseLong(scn)+step_size},  OPTIONS  => DBMS_LOGMNR.DICT_FROM_ONLINE_CATALOG + DBMS_LOGMNR.NO_SQL_DELIMITER  + DBMS_LOGMNR.NO_ROWID_IN_STMT + DBMS_LOGMNR.SKIP_CORRUPTION);END;"
    }
    log.debug("执行${startLogMinerSql.toString()}")
    //LogMiner start后，视图是随着redo日志文件增长的。比如前后两次查询的最大scn值就是不同的
    sql.execute(startLogMinerSql.toString())
    //先查询当前视图最大scn号
    log.debug("执行${selectMaxScnSql}")
    thisViewMaxScn = sql.rows(selectMaxScnSql).get(0)?.getProperty("MAX")?.toString()
    //执行查询视图
    String selectRedoSql = "SELECT SCN,TABLE_NAME,SEG_OWNER,SQL_REDO FROM v\$logmnr_contents where SEG_TYPE=2 AND OPERATION_CODE IN (1,2,3)"
    def schema = SCHEMA.value
    if(schema!="null"){
        selectRedoSql = selectRedoSql+" AND  SEG_OWNER =\'${schema}\' AND USERNAME != \'SYS\' "
    }else{
        selectRedoSql = selectRedoSql+" AND  SEG_OWNER NOT IN (\'SYS\', \'SYSTEM\') AND USERNAME != \'SYS\' "
    }
   
    log.debug("执行${selectRedoSql}")
    sql.rows(selectRedoSql).eachWithIndex { row, idx ->
        lastScn = row.getProperty("SCN")?.toString() 
            def ff = session.create()
            ff=session.putAttribute(ff,"SCN",row.getProperty("SCN")?.toString())
            ff=session.putAttribute(ff,"tableName",row.getProperty("TABLE_NAME")?.toString())
            ff=session.putAttribute(ff,"segOwner",row.getProperty("SEG_OWNER")?.toString())
            ff = session.write(ff, {outputStream ->
                    outputStream.write(row.getProperty("SQL_REDO")?.toString().getBytes(StandardCharsets.UTF_8))
                    } as OutputStreamCallback)
            session.transfer(ff, REL_SUCCESS)
    }
   
    log.debug("执行${endLogMinerSql}")
    sql.execute(endLogMinerSql)
} catch(e) {
    log.error('Scripting error', e)
    return
}finally {
   sql?.close() 
}
//更新state逻辑 
if(lastScn){
    lastScn = lastScn>thisViewMaxScn?lastScn:thisViewMaxScn
}else{
    lastScn = thisViewMaxScn
}
def newMap = ['scn':lastScn]

if (stateMap.version == -1) {
  stateManager.setState(newMap, Scope.CLUSTER);
} else {
  stateManager.replace(stateMap, newMap, Scope.CLUSTER);
}



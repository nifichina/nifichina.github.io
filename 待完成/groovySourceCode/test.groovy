import groovy.json.JsonSlurper
import com.fasterxml.jackson.databind.ObjectMapper

def flowfile = session.get()
if(!flowfile) return

def jsonObject = new groovy.json.JsonSlurper().parseText(flowfile.read().getText("UTF-8"))

def srcsystemcode = jsonObject.srcsystemcode?.toString()
def srcentitycode =jsonObject.entitycode?.toString()
def tenantid = jsonObject.tenantid?.toString()
def user = jsonObject.user?.toString()
def action = jsonObject.action?.toString()

flowfile.putAttribute("srcsystemcode",srcsystemcode)
flowfile.putAttribute("srcentitycode",srcentitycode)
flowfile.putAttribute("tenantid",tenantid)
flowfile.putAttribute("user",user)
flowfile.putAttribute("action",action)

if(!srcentitycode){
    logError("false","来源实体编码不能为空！","601",flowfile)
    return
}

// ----------------------------------------------------------------------------------------------------------------
//【获取此原始数据表对应的增量字段、主键、等等相关配置信息  start】
// ----------------------------------------------------------------------------------------------------------------
def settings=CONFIG.evaluateAttributeExpressions(flowfile).getValue()
//缓存中无配置信息，则从MySQL查配置信息，并写入缓存中
if(!settings){
    logError("false","根据来源实体${srcentitycode}未找到相关的ETL配置信息！","621",flowfile)
    return
}
def settingsjson =new groovy.json.JsonSlurper().parseText(settings)
//判断配置信息是否正确格式json
if(!settingsjson){
    logError("false","根据来源实体${srcentitycode}查询到ETL配置信息格式不正确！","622",flowfile)
    return
}
// ----------------------------------------------------------------------------------------------------------------
//【获取此原始数据表对应的增量字段、主键、等等相关配置信息  end】
// ----------------------------------------------------------------------------------------------------------------


def versionfield = settingsjson["versionfield"]?.toString()
def idfield = settingsjson["idfield"]?.toString()
def datainfofield =settingsjson["datainfofield"]?.toString()
if(!versionfield || !idfield){
    logError("false","根据来源实体${srcentitycode}查询到ETL配置信息格式不正确:主键字段[${idfield}],版本字段[${versionfield}]","622",flowfile)
    return
}
def orgfield = settingsjson["orgfield"]?.toString()
def datetimefield = settingsjson["datetimefield"]?.toString()

def dataversion = jsonObject.data[versionfield]?.toString()
def dataid = jsonObject.data[idfield]?.toString()
def datainfo = jsonObject.data[datainfofield]?.toString()
def org = jsonObject.data[orgfield]?.toString()
def datetime = jsonObject.data[datetimefield]?.toString()

if(!dataversion||!dataid){
    logError("false","原始事项[${srcentitycode}]缺少关键信息：主键信息[${dataid}],数据版本[${dataversion}]","623",flowfile)
    return
}

def rowkey = tenantid + dataid
//加Redis锁
if(!addLock(rowkey)){
    flowfile.putAttribute("WAIT","true")
    REL_SUCCESS << flowfile
    return
}
flowfile.putAttribute("WAIT","false")
flowfile.putAttribute("dataid",dataid)
flowfile.putAttribute("dataversion",dataversion)
flowfile.putAttribute("datainfo",datainfo)
flowfile.putAttribute("org",org)
flowfile.putAttribute("datetime",datetime)
flowfile.putAttribute("rowkey",rowkey)

//id,srcsystemcode,srcentitycode,dataid,dataversion,datainfo,org,action,tenantid,user,data,datetime)
//'$dataid','$srcsystemcode','$srcentitycode','$dataid','$dataversion','$datainfo','$org','$action','$tenantid','$user','$jsonObject.data','$datetime')

jsonObject.put("srcentitycode",srcentitycode)
jsonObject.put("dataid",dataid)
jsonObject.put("dataversion",dataversion)
jsonObject.put("datainfo",datainfo)
jsonObject.put("org",org)
jsonObject.put("tenantid",tenantid)
jsonObject.put("user",user)
jsonObject.put("datetime",datetime)
jsonObject.remove("entitycode")

ObjectMapper mapper = new ObjectMapper()
flowfile.write("UTF-8",mapper.writeValueAsString(jsonObject))
REL_SUCCESS << flowfile

void logError(String success,String msg,String errorcode,def flowfile){
    flowfile.putAttribute("success",success)
	flowfile.putAttribute("message",msg)
	flowfile.putAttribute("errorcode",errorcode)
    REL_FAILURE << flowfile
    return
}

boolean addLock(String key){
    return CTL.RedisLock.addLock(key, key, 30000)
}

boolean realeaseLock(String key){
    return CTL.RedisLock.releaseLock(key,key)
}
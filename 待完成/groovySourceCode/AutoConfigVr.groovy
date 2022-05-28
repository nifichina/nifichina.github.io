import org.apache.commons.io.IOUtils
import java.nio.charset.StandardCharsets
//自动添加变量注册表  编辑json Put nifi-api  添加变量
flowFile = session.get()
if(!flowFile) return

def text = ''
// Cast a closure with an inputStream parameter to InputStreamCallback
session.read(flowFile, {inputStream ->
  text = IOUtils.toString(inputStream, StandardCharsets.UTF_8)
  // Do something with text here
} as InputStreamCallback)

def jsonSlurper = new JsonSlurper()

//获取到的是Map对象
def map = jsonSlurper.parseText(text)
/**
{
  "processGroupRevision" : {
    "clientId" : "541036f9-37fe-174d-b3dc-f2b1a4780177",
    "version" : 5
  },
  "variableRegistry" : {
    "variables" : [ {
      "variable" : {
        "name" : "test",
        "value" : "1",
        "processGroupId" : "870b6726-016e-1000-1795-ca1a70e4326b",
        "affectedComponents" : [ ]
      },
      "canWrite" : true
    } ],
    "processGroupId" : "870b6726-016e-1000-1795-ca1a70e4326b"
  }
}
*/
def tableLists = tableText.value


def buildVariable(def name,def value,def groupId){
    Map variable = [:]
    def affectedComponents = []
    variable.put("name",name)
    variable.put("value",value)
    variable.put("processGroupId",groupId)
    variable.put("affectedComponents",affectedComponents)
    return variable
}



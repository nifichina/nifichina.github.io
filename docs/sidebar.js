const fs = require('fs')
/* 
1. fs.stat  检测是文件还是目录(目录 文件是否存在) 
2. fs.mkdir  创建目录 （创建之前先判断是否存在） 
3. fs.writeFile  写入文件(文件不存在就创建,但不能创建目录) 
4. fs.appendFile 写入追加文件 
5.fs.readFile 读取文件 
6.fs.readdir 读取目录 
7.fs.rename 重命名 
8. fs.rmdir  删除目录 
9. fs.unlink 删除文件 
*/
let ignoreFileNameSet  = new Set()
    ignoreFileNameSet.add('.vuepress')
    ignoreFileNameSet.add('image')
    ignoreFileNameSet.add('.DS_Store')
    ignoreFileNameSet.add('README.md')
    ignoreFileNameSet.add('sidebar.js')
    ignoreFileNameSet.add('wechat.jpg')
    ignoreFileNameSet.add('待完成')
    ignoreFileNameSet.add('index')
    ignoreFileNameSet.add('groovySourceCode')

let test = walk(__dirname, '/')
console.log(test)

module.exports = function resolveSideBar() {
    let sidebars = walk(__dirname, '/')
    return sidebars
}

function walk(dir, sidebarDir) {
    let children = []
    fs.readdirSync(dir).forEach(function(filename){
        if (!ignoreFileNameSet.has(filename)){
            var path = dir+"/"+filename
            var stat = fs.statSync(path)
            if (stat && stat.isDirectory()) {
                let obj = {}
                obj.text = filename
                obj.collapsible = true
                obj.children = walk(path, sidebarDir + filename + '/')
                children.push(obj)
            } else {
              let article = filename.replace('.md', '')
              children.push(sidebarDir + article)
            }
        }
    })
    return children
    }
const fs = require("fs")

let tools = {
    isDir: (road) => fs.statSync(`${road}`).isDirectory(),
    DirTree
}
/**
 * 递归文件树结构
 * @param {String} road 路径W
 * @returns {Array} 文件树结构json
 */
async function DirTree(road, arr = []) {
    if (tools.isDir(road)) {
        for (const item of fs.readdirSync(road)) {
            let obj = {
                title: item,
                key: item,
            }
            if (tools.isDir(`${road}/${item}`)) {
                obj.children = await DirTree(`${road}/${item}`, [])
            }
            arr.push(obj)
        }
    }
    return arr
}
module.exports = tools 
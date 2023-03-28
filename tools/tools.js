const fs = require("fs")

let tools = {
    isDir: (road) => fs.statSync(`${road}`).isDirectory(),
    DirTree,
    setCookie
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

/** 设置cookie
 * @date 2023-02-18
 * @param {any} res res对象
 * @param {String} cookieName cookie名
 * @param {String} cookinfo cookie内容
 * @param {Number} time 过期时间（分钟）,默认0（会话）
 */
function setCookie(res, cookieName, cookinfo, time = 0) {
    res.cookie(cookieName, AES.set(cookinfo), {
        maxAge: 60000 * time,   //过期时间，单位毫秒
        httpOnly: true,         //只能服务器改变cookie
        // signed: true,           //使用签名模式
        // secure : true,          //只有https才可以用
        // domain: 'webnote.fun',  //域名
        // path: '/'               //路径
    });
}
module.exports = tools 
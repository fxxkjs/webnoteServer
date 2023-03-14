// 创建路由对象
const express = require('express')
// var svgCaptcha = require('svg-captcha');
const router = express.Router()
const fs = require("fs")
const multer = require('multer')
const path = require('path')
const mail = require("../tools/mail")

const mdPath = "./mdRoot/md"
const userPath = "./mdUser"
const navReg = /^[a-z0-9A-Z\u4e00-\u9fa5+-._=%$#@!]{2,16}$/
const fileNameReg = /(?=.*[\\|/<>?:"'`*^()]).+/
const imgReg = /.(jpg|jpeg|gif|bmp|png)$/
const mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;


// 登录注册
router.post('/register', function (req, res) {
    // 验证格式
    if (mailReg.test(req.body.username) && req.body.password.length >= 6 && req.body.password.length <= 16) {
        if (req.body.code === req.signedCookies.wn) {
            // 为用户创建个人目录
            fs.mkdir(`${userPath}/${req.body.username}`, (err) => {
                if (err) {
                    fs.readFile(`${userPath}/${req.body.username}/info/userInfo.json`, 'utf-8',
                        (err, data) => {
                            if (err) {
                                console.log(err);
                                console.log(`${userPath}/${req.body.username}/info/userInfo.json`);
                                res.send({ code: 0, msg: "系统繁忙，请稍后重试。" })
                            } else {
                                let userinfo = JSON.parse(data)
                                if (req.body.username === userinfo.id && req.body.password === userinfo.psw) {
                                    setCookie(res, "webnote", req.body.username, 60 * 24)
                                    res.send({ code: 1, msg: "登录成功。" })
                                    let data = JSON.stringify({ time: new Date().toLocaleString(), ip: req.ipInfo, msg: true })
                                    fs.writeFile(`${userPath}/${req.body.username}/info/signInLog.json`, `${data};\n`, { flag: "a" }, (err) => { })
                                } else {
                                    res.send({ code: 0, msg: "用户名或密码错误。" })
                                    let data = JSON.stringify({ time: new Date().toLocaleString(), ip: req.ipInfo, msg: false })
                                    fs.writeFile(`${userPath}/${req.body.username}/info/signInLog.ison`, `${data}:\n`, { flag: "a" }, (err) => { })
                                }
                            }
                        }
                    );

                } else {
                    let errNum = null
                    // 创建基础文件及目录
                    fs.cp(mdPath, `${userPath}/${req.body.username}/md`, { recursive: true }, function (err) {
                        if (err) {
                            errNum++
                        } else {
                            fs.mkdir(`${userPath}/${req.body.username}/img`, (err) => { if (err) { errNum++ } })
                            fs.mkdir(`${userPath}/${req.body.username}/info`, (err) => { if (err) { errNum++ } })
                            let config = JSON.stringify({ time: new Date().toLocaleString(), id: req.body.username, psw: req.body.password, ip: req.ipInfo })
                            fs.writeFile(`${userPath}/${req.body.username}/info/userInfo.json`, `${config}\n`, { flag: "a" }, (err) => { if (err) { errNum++ } })
                            if (errNum === null) {
                                setCookie(res, "webnote", req.body.username, 60 * 24)
                                res.send({ code: 1, msg: "注册成功。" })
                            } else {
                                fs.rm(`${userPath}/${req.body.username}`, { recursive: true, maxRetries: 10 }, function (err) { })
                                res.send({ code: 0, msg: "服务器繁忙，请稍后重试。" })
                            }
                        }


                    })
                }
            });
        } else {
            req.signedCookies.wn === undefined ? res.send({ code: 0, msg: "验证码已过期。" }) : res.send({ code: 0, msg: "验证码错误。" })
        }
    } else {
        res.send({ code: 0, msg: "账号或密码格式不符合要求。" })
    }
})

// 获取顶部目录
router.get('/topNav', (req, res) => {
    fs.readdir(
        req.signedCookies && req.signedCookies.webnote && fs.statSync(`${userPath}/${req.signedCookies.webnote}/md`, { throwIfNoEntry: false }) ? `${userPath}/${req.signedCookies.webnote}/md` : mdPath,
        (err, files) => {
            err ? res.send({ code: 0, data: ["请刷新重试。", "意料之外的错误，"] }) : res.send({ code: 1, data: files })
        }
    )
})

// 获取导航栏目录
router.get('/leftNav', (req, res) => {
    fs.readdir(
        tmpPath = `${req.signedCookies && req.signedCookies.webnote ? `${userPath}/${req.signedCookies.webnote}/md` : mdPath}/${req.query.topnav}`,
        (err, data) => {
            if (err || !fs.statSync(tmpPath, { throwIfNoEntry: false })) {
                res.send({ code: 0, data: [{ title: "404", value: ["意料之外的错误，", "请刷新重试。"] }] })
            } else {
                let tmpArr = []
                let tmpObj = {}
                for (const ite of data) {
                    tmpObj.title = ite
                    tmpObj.value = fs.readdirSync(tmpPath + "/" + ite).map(function (value) {
                        return value.substring(0, value.lastIndexOf('.'))
                    })
                    tmpArr.push(tmpObj)
                    tmpObj = {}
                }
                res.send({ code: 0, data: tmpArr })
                tmpArr = []
            }
        })
})

// 参数路由获取文档内容
router.get('/cont/:topnav/:leftnav/:title', function (req, res) {
    fs.readFile(`${req.signedCookies && req.signedCookies.webnote ? `${userPath}/${req.signedCookies.webnote}/md` : mdPath}/${req.params.topnav}/${req.params.leftnav}/${req.params.title}.md`,
        'utf-8',
        (err, data) => { err ? res.send({ code: 1, data: `> 非法请求！` }) : res.send({ code: 1, data: `${data}` }) }
    );
    // 记录访问者IP地址
    fs.writeFile(
        `${req.signedCookies && req.signedCookies.webnote ? `${userPath}/${req.signedCookies.webnote}/info/log.txt` : `./mdRoot/log/log.txt`}`,
        `time: ${new Date().toLocaleString()},   IP: ${req.ipInfo.ip},   item: ${req.params.topnav}/${req.params.leftnav}/${req.params.title}; \n`,
        { flag: "a" },
        (err) => { }
    )
})

// 添加分类
router.post('/addFolder', function (req, res) {
    !req.signedCookies.webnote && !fs.statSync(`${userPath}/${req.signedCookies.webnote}`, { throwIfNoEntry: false })
        ? res.send({ code: 0, msg: "非法操作！" }) :
        !navReg.test(req.body.topNav) && !navReg.test(req.body.leftNav) ? res.send({ code: 0, msg: "请检查格式。" })
            : fs.mkdir(
                req.body.leftNav ? `${userPath}/${req.signedCookies.webnote}/md/${req.body.topNav}/${req.body.leftNav}` : `${userPath}/${req.signedCookies.webnote}/md/${req.body.topNav}`,
                (err) => { err ? res.send({ code: 0, msg: "该分类已存在。" }) : res.send({ code: 1, msg: "添加成功。" }) }
            )
})

// 删除分类
router.post('/delFolder', function (req, res) {
    if (req.signedCookies && req.signedCookies.webnote && fs.statSync(`${userPath}/${req.signedCookies.webnote}`, { throwIfNoEntry: false })) {
        fs.rm(
            !req.body.leftNav && !req.body.items ? `${userPath}/${req.signedCookies.webnote}/md/${req.body.topNav}`
                : req.body.leftNav && !req.body.items ? `${userPath}/${req.signedCookies.webnote}/md/${req.body.topNav}/${req.body.leftNav}`
                    : `${userPath}/${req.signedCookies.webnote}/md/${req.body.topNav}/${req.body.leftNav}/${req.body.items}.md`,
            { recursive: true },
            (err) => { err ? res.send({ code: 0, msg: "意料之外的错误，请刷新页面重试。" }) : res.send({ code: 1, msg: "删除成功" }) }
        )
    } else {
        res.send({ code: 0, msg: "非法操作！" })
    }
})

// 上传md
router.post("/upMd", function (req, res) {
    let upload = multer({
        storage: multer.diskStorage({ // 存储引擎
            destination: function (req, file, cb) { // 配置文件存储目录
                let tmpPath = `${userPath}/${req.signedCookies.webnote}/md/${req.body.topNavType}/${req.body.leftNavType}`
                cpType(req, tmpPath) && req.signedCookies.webnote && req.body.topNavType && req.body.leftNavType
                    ? cb(null, tmpPath) : cb(`${file.originalname}上传失败，参数缺失！`)
            },
            filename: function (req, file, cb) { // 配置文件名
                cb(null, file.originalname)
            }
        }),
        fileFilter: function (req, file, cb) { // 文件过滤 
            let fileInfo = path.parse(file.originalname)
            fileNameReg.test(fileInfo.name) ? cb(`${file.originalname} 包含特殊字符。`, false)
                : fileInfo.ext === ".md" ? cb(null, true) : cb(`${file.originalname}不是md文件!`, false)
        },
        limits: {
            fileSize: 1024000 * 0.1,
        }
    }).array('file')

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.statusCode = 403
            res.send({ code: 0, msg: "文件超100k！" });
        } else if (err) {
            res.statusCode = 403
            res.send({ code: 0, msg: err });
        } else {
            res.send({ code: 1, msg: "上传成功！" })
        }
    })
})

// 更新md
router.post("/upMdData", function (req, res) {
    req.body.topNavType && req.body.leftNavType && req.body.ItemType && req.signedCookies.webnote && fs.statSync(`${userPath}/${req.signedCookies.webnote}`, { throwIfNoEntry: false })
        ? fs.writeFile(
            `${userPath}/${req.signedCookies.webnote}/md/${req.body.topNavType}/${req.body.leftNavType}/${req.body.ItemType}.md`,
            req.body.content,
            (err) => { err ? res.send({ code: 0, msg: "保存失败，请重试。" }) : res.send({ code: 1, msg: "保存成功。" }) }
        )
        : res.send({ code: 0, msg: "欢迎页内容无法保存。" })
})

// 新建空白md
router.post('/addMd', function (req, res) {
    if (!req.signedCookies.webnote) {
        res.send({ code: 0, msg: `非法操作` })
    }
    let path = `${userPath}/${req.signedCookies.webnote}/md/${req.body.topNavType}/${req.body.leftNavType}/${req.body.mdName}.md`
    fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFile(path, "", (err) => {
                if (err) {
                    res.send({ code: 0, msg: `${req.body.mdName} 创建失败，请稍后重试` })
                } else {
                    res.send({ code: 1, msg: `${req.body.mdName} 创建成功` })
                }
            })
        } else {
            res.send({ code: 0, msg: `${req.body.mdName} 已存在，请更换文件名。` })
        }
    })

});

// md重命名
router.post('/setMdName', function (req, res) {
    if (!req.signedCookies.webnote) {
        res.send({ code: 0, msg: `非法操作` })
    }
    let path = `${userPath}/${req.signedCookies.webnote}/md/${req.body.topNavType}/${req.body.leftNavType}`
    fs.access(`${path}/${req.body.mdName}.md`, fs.constants.F_OK, (err) => {
        if (err) {
            res.send({ code: 0, msg: `非法操作` })
        } else {
            fs.rename(`${path}/${req.body.mdName}.md`, `${path}/${req.body.newMdName}.md`, (err) => {
                if (err) {
                    res.send({ code: 0, msg: `${req.body.mdName} 重命名失败，请稍后重试` })
                } else {
                    res.send({ code: 1, msg: `${req.body.mdName} 已重命名为 ${req.body.newMdName} ` })
                }
            })

        }
    })

});

// 上传md图片
router.post('/upImg', function (req, res) {
    let upload = multer({
        storage: multer.diskStorage({ // 存储引擎
            destination: function (req, file, cb) { // 配置文件存储目录
                let tmpPath = `${userPath}/${req.signedCookies.webnote}/img/`
                cpType(req, tmpPath) ? cb(null, tmpPath) : cb("非法请求！")
            },
            filename: function (req, file, cb) { // 配置文件名
                cb(null, file.originalname)
            }
        }),
        fileFilter: function (req, file, cb) { // 文件过滤 
            let fileInfo = path.parse(file.originalname)
            fileNameReg.test(fileInfo.name) ? cb(`${file.originalname} 包含特殊字符。`, false) : false
                || imgReg.test(fileInfo.base) ? cb(null, true) : cb(`${file.originalname}不是常用图片格式！`, false)
        },
        limits: {
            fileSize: 1024000 * 2,
        }

    }).single('imgdata')

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.send({ code: 0, msg: `${req.file.originalname} 大于2M!` })
        } else if (err) {
            res.send({ code: 0, msg: err })
        } else {
            res.send({ code: 1, msg: `${req.file.originalname} 上传成功。`, imgUrl: `/getimg/${req.file.originalname}` })
        }

    })
})

// 删除md图片
router.post('/delImg', function (req, res) {
    if (req.signedCookies.webnote && req.body.imgName) {
        let path = `${userPath}/${req.signedCookies.webnote}/img/${req.body.imgName}`
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                res.send({ code: 0, msg: `${req.body.imgName} 不存在。` })
            } else {
                fs.rm(path, function (err) { err ? res.send({ code: 0, msg: `${req.body.imgName} 删除失败，请稍后重试。` }) : res.send({ code: 1, msg: `${req.body.imgName} 删除成功。` }) })
            }
        })
    } else {
        res.send({ code: 0, msg: "非法请求" })
    }

});

// 获取图片
router.get("/getimg/:imgname", function (req, res) {
    if (!req.signedCookies.webnote) {
        if (req.session.webnote === req.ipInfo.ip) {
            fs.access(`${mdPath}/../img/${req.params.imgname}`, fs.constants.F_OK, (err) => {
                if (!err) {
                    fs.createReadStream(`${mdPath}/../img/${req.params.imgname}`).pipe(res)
                } else {
                    fs.createReadStream(`${mdPath}/../img/404.png`).pipe(res)
                }
            })
        } else {
            fs.createReadStream(`${mdPath}/../img/401.png`).pipe(res)
        }

    } else {
        let imgPath = `${userPath}/${req.signedCookies.webnote}/img/${req.params.imgname}`
        fs.access(imgPath, fs.constants.F_OK, (err) => {
            if (!err) {
                fs.createReadStream(imgPath).pipe(res)
            } else {
                fs.createReadStream(`${mdPath}/../img/404.png`).pipe(res)
            }
        })
    }
})

// 查询图片是否存在
router.post('/queryImg', function (req, res) {
    if (cpType(req, `${userPath}/${req.signedCookies.webnote}`)) {
        if (req.body.imgNameArr instanceof Array) {
            let imgArr = []
            req.body.imgNameArr.forEach((item) => {
                if (!fs.statSync(`${userPath}/${req.signedCookies.webnote}/img/${item}`, { throwIfNoEntry: false })) {
                    imgArr.push(item)
                }
            })
            imgArr.length === 0 ? res.send({ code: 1, msg: "全部存在。", data: [] }) : res.send({ code: 0, msg: "msg中的不存在", data: imgArr })
        } else {
            res.send({ code: 0, msg: "非法参数！" })
        }
    } else {
        res.send({ code: 0, msg: "非法请求！" })
    }

});

// 发送验证码
router.post('/getCode', (req, res) => {
    let code = Math.random().toFixed(6).slice(-6)
    setCookie(res, "wn", code, 10)
    // mail.sendCode(req.body.username, code, (err, info) => {
    //     err ? res.send({ code: 0, msg: "邮件发送失败！" }) : res.send({ code: 1, msg: "邮件发送成功" });
    // })

    console.log(code);
    res.send({ code: 1, msg: "邮件发送成功" });
})

/** 设置cookie
 * @date 2023-02-18
 * @param {any} res res对象
 * @param {String} cookieName cookie名
 * @param {String} cookinfo cookie内容
 * @param {Number} time 过期时间（分钟）
 */
function setCookie(res, cookieName, cookinfo, time) {
    res.cookie(cookieName, cookinfo, {
        maxAge: 60000 * time,   //过期时间，单位毫秒
        httpOnly: true,         //只能服务器改变cookie
        signed: true,           //使用签名模式
        // secure : true,          //只有https才可以用
        // domain: 'webnote.fun',  //域名
        // path: '/'               //路径
    });
}

// 设置  session
router.get('/session', (req, res) => {
    req.session.webnote = req.ipInfo.ip
    res.send()
});

// cookieType
router.post('/cookieType', function (req, res) {
    req.signedCookies && req.signedCookies.webnote ? res.send({ code: 1, msg: "已登录。" }) : res.send({ code: 0, msg: "网络异常,请重试。" })
})

//  摧毁 session 回调函数设置跳转域名
router.get('/unSession', (req, res) => {
    req.session.destroy(function (err) {
        err ? res.send({ code: 0, msg: "err" }) : res.send({ code: 1, msg: "成功" })
    });
});

/**判断cookie和路径是否存在
 * @date 2023-02-15
 * @param {Object} req req对象
 * @param {String} paths 需要判断的路径
 * @returns {Boolean} true存在，false其中一项不存在。
 */
function cpType(req, paths) {
    return !!req.signedCookies.webnote && !!fs.statSync(paths, { throwIfNoEntry: false })
}

//  router全局配置
// router.all('*', function (req, res, next) {
//     // res.header("Access-Control-Allow-Origin", "*"); // 允许所有域名访问
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080/"); // 只允许特定域名访问
//     res.header("Access-Control-Allow-Credentials", true)
//     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     // res.header("X-Powered-By", ' 3.2.1')
//     // res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
// 导出路由对象
module.exports = router
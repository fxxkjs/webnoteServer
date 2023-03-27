const express = require('express');
const helmet = require('helmet');
const router = require("./routers/router")      // 路由
const admin = require("./routers/admin")      // 路由
const bodyParser = require('body-parser');      // post Body
const cookieParser = require('cookie-parser')   // cookie
const session = require('express-session')      // session
const compression = require('compression')      // gzip
const expressip = require('express-ip');        // userIP
const config = require("./config")
// const cors = require('cors')                 // 跨域


// 基于express创建服务器
const app = express();
app.use(helmet())
app.use(cookieParser())
app.use(session({ secret: config.sessionKey, resave: false, saveUninitialized: false, cookie: { secure: false }, name: "token" }));
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(expressip().getIpInfoMiddleware);
// app.use(cors({ origin: ['http://example.com'] }))
app.use(router)
app.use(admin)
app.use(express.static(config.distUrl))
// app.use(express.static("../v3/dist"))

// let obj = { "time": "2023/3/24 22:43:44", "id": "aa@qq.com", "psw": "111111", "ip": { "ip": "127.0.0.1", "error": "This won't work on localhost" } }
// let sf = JSON.stringify(obj) + "\n" + JSON.stringify(obj)
// let arr = []
// console.log(sf);
// sf.split("\n").forEach(item => {
//     arr.push(JSON.parse(item))
// })
// console.log(arr);
// console.log(process.env.NODE_ENV);
// 启动，监听指定端口
app.listen(config.appPort, function () {
    console.log('启动成功');
});
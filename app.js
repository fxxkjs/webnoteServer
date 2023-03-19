const express = require('express');
const helmet = require('helmet');
const router = require("./routers/router")      // 路由
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
app.use(express.static(config.distUrl))


// console.log(process.env.NODE_ENV);
// 启动，监听指定端口
app.listen(config.appPort, function () {
    console.log('启动成功');
});
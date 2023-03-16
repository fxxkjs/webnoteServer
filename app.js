const express = require('express');
const router = require("./routers/router")      // 路由
const bodyParser = require('body-parser');      // post Body
const cookieParser = require('cookie-parser')   // cookie
const session = require('express-session')      // session
const compression = require('compression')      // gzip
const expressip = require('express-ip');        // userIP
const config = require("./config")
// const cors = require('cors')                    // 跨域


// 基于express创建服务器
const app = express();
app.use(cookieParser())
app.use(session({ secret: config.sessionKey, resave: false, saveUninitialized: false, cookie: { secure: false }, name: "tooken" }));
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(expressip().getIpInfoMiddleware);
// app.use(cors())

app.use(router)
app.use(express.static(config.dist))

// 启动，监听指定端口
app.listen(config.port, function () {
    console.log('启动成功');
});
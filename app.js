const express = require('express');
const router = require("./routers/router")      // 路由
const bodyParser = require('body-parser');      // post Body
const cookieParser = require('cookie-parser')   // cookie
const session = require('express-session')      // session
const compression = require('compression')      // gzip
const expressip = require('express-ip');        // userIP
// const cors = require('cors')                    // 跨域

// 基于express创建服务器
const app = express();
app.use(cookieParser("key775"))
app.use(session({ secret: "key775", resave: false, saveUninitialized: false, cookie: { secure: false }, name: "tooken" }));
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(expressip().getIpInfoMiddleware);
// app.use(cors())



app.use(router)
app.use(express.static('../webnote/dist'))
// app.use(express.static('./dist'))

// 启动，监听指定端口
app.listen(65535, function () {
    console.log('启动成功');
});
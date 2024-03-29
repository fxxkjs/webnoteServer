const nodemailer = require('nodemailer')
const config = require("../config")
// 邮件配置，默认使用SMTP
const transporter = nodemailer.createTransport({
    host: config.mail.host, // 邮件服务器地址
    port: config.mail.port, // 邮件服务器端口
    secure: true,           // 邮件服务器SSL端口为true，否则false
    auth: {
        user: config.mail.user, // 邮箱账号
        pass: config.mail.pass, // 邮箱SMTP授权码
    },
});


/** 给用户发验证码
 * @date 2023-02-17
 * @param {String} userMail 用户邮箱
 * @param {Number|String} numCode 验证码
 * @function callback(err,info)
 */
function sendCode(userMail, numCode, callback) {
    //  邮件内容
    let mailInfo = {
        from: config.mail.from,
        to: userMail,
        subject: "Code",
        text: `你的一次性代码为: ${numCode}
        
        如果你没有请求此代码，可放心忽略这封电子邮件。别人可能错误地键入了你的电子邮件地址。`,
    }
    //  发送邮件
    transporter.sendMail(mailInfo, (err, info) => {
        callback && callback(err, info)
    })
}


module.exports = { sendCode }
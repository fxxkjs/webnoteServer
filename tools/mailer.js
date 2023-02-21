const nodemailer = require('nodemailer')

class NodeMailer {
    constructor(params) {
        const {host, port, secure, auth} = params
        this.transporter = null
        this.host = host
        this.port = port
        this.secure = secure
        this.auth = auth
    }
    create() {
        const { host, port, secure, auth } = this
        this.transporter = nodemailer.createTransport({ host, port, secure, auth });
    }

    sendCode(to, numCode) {
        return new Promise((resolve, reject) => {
            let mailInfo = {
                from: '"webnote" <webnotefun@163.com>',
                // to: userMail,
                subject: "Code",
                text: `你的一次性代码为: ${numCode}
                
                如果你没有请求此代码，可放心忽略这封电子邮件。别人可能错误地键入了你的电子邮件地址。`,
                html:"<div>"
            }
            let result = Object.assign(mailInfo, { numCode, to })

            this.transporter.sendMail(result, (err, info) => {
                if (err) {
                    reject(err)
                } else {
                  resolve(info)
                }

            })
        })


    }
}

let defaultParams = {
    host: "smtp.163.com123123",
    port: 465,
    secure: true,
    auth: {
        user: 'webnotefun@163.com',     // 邮箱账号
        pass: 'WQBPFCQDCPINVJZS'
    }
}


const nodeMailer = new NodeMailer(defaultParams)
nodeMailer.create()

module.exports = nodeMailer
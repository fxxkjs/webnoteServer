### config.js

```js
module.exports = {
  mail: {
    host: "smtp.163.com", // 邮件服务器地址
    port: 465, // 邮件服务器端口
    user: "@163.com", // 邮箱账号
    pass: "", // 邮箱SMTP授权码
    from: '"name" <@163.com>', // 发件人名称 邮箱
  },
  AESKey: "", // AES加密字符串
  sessionKey: "", // session加密字符串
  origin: [""] // 允许跨域域名列表
};
```

### CentOS7 中文文件名乱码

```
下载依赖
yum -y install convmv
将md下所有文件名递归转码为UTF-8
convmv -f GBK -t UTF-8 --notest -r path/md/*
```

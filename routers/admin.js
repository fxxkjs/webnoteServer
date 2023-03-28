const express = require("express");
const router = express.Router();
const fs = require("fs");
const AES = require("../tools/AES");
const path = require("path");
const userPath = path.join(__dirname, "../mdUser");
const rootPath = path.join(__dirname, "../mdRoot");
const tools = require("../tools/tools");

// 获取用户列表
router.get("/getUserList", (req, res) => {
  if (isUser(req.cookies.webnote)) {
    let userInfo = [];
    for (const item of fs.readdirSync(userPath)) {
      let userData = JSON.parse(
        fs.readFileSync(`${userPath}/${item}/info/userInfo.json`, "utf-8")
      );
      userInfo.push({
        key: AES.set(userData.id),
        time: userData.time,
        userID: slice2(userData.id),
        IP: sliceIp(userData.ip.ip),
      });
    }
    res.send({ code: 1, data: userInfo });
  } else {
    res.send({ code: 0, msg: "非法请求" });
  }
});

// 获取用户访问日志
router.post("/getUserLog", (req, res) => {
  if (isUser(req.cookies.webnote)) {
    let path
    let isroot = false
    if (isUser(req.body.userKey)) {
      path = `${userPath}/${AES.get(req.body.userKey)}/info/log.txt`;
    } else {
      path = `${rootPath}/log/log.txt`;
      isroot = true
    }
    fs.readFile(path, "utf-8", (err, data) => {
      let arr = [];
      data.split("\n").slice(0, -1).reverse().forEach((item, index) => {
        let data = JSON.parse(item);
        arr.push({
          key: index,
          time: data.time,
          IP: sliceIp(data.IP),
          title: isroot ? data.path : "******" + data.path.slice(-2, data.path.lenth)
        });
      });
      res.send({ code: 1, data: arr });
    });
  } else {
    res.send({ code: 0, msg: "非法请求" });
  }
});

// 获取用户登录日志
router.post("/getUserSignInLog", (req, res) => {
  if (AES.get(req.body.userKey)) {
    let path = `${userPath}/${AES.get(req.body.userKey)}/info/signInLog.txt`;
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        res.send({ code: 0, msg: "服务器忙，请稍后重试。" });
      } else {
        let arr = [];
        let dataArr = data.split("\n").slice(0, -1).reverse()
        dataArr.forEach((item, index) => {
          let data = JSON.parse(item);
          arr.push({
            key: index,
            time: data.time,
            IP: sliceIp(data.ip.ip),
            title: data.msg ? "成功" : "失败",
          });
        });
        res.send({ code: 1, data: arr });
      }
    });
  } else {
    res.send({ code: 0, msg: "没有权限。" });
  }
});

// 获取用户图片列表
router.post("/getUserImgList", (req, res) => {
  if (isUser(req.cookies.webnote)) {
    let path;
    if (AES.get(req.body.userKey)) {
      path = `${userPath}/${AES.get(req.body.userKey)}/img`;
    } else {
      path = `${rootPath}/img`;
    }
    fs.readdir(path, (err, data) => {
      if (err) {
        res.send({ code: 0, msg: "服务器繁忙，请稍后重试。" });
      } else {
        let arr = [];
        data.forEach((item, index) => {
          arr.push({
            key: AES.set(item),
            name: slice2(item),
            size: `${~~(fs.statSync(`${path}/${data[index]}`).size / 1024)} KB`,
          });
        });
        res.send({ code: 1, data: arr });
      }
    });
  } else {
    res.send({ code: 0, msg: "非法请求" });
  }
});

// 获取adminNav
router.get("/getAdminNav", async (req, res) => {
  if (isUser(req.cookies.webnote)) {
    res.send({ code: 1, data: await tools.DirTree(`${rootPath}/md`) });
  } else {
    res.send({ code: 0, msg: "非法请求" });
  }
});

// 获取mdData
router.post("/getMdData", function (req, res) {
  if (isUser(req.cookies.webnote)) {
    fs.readFile(`${rootPath}/md/${req.body.path}`, "utf-8", (err, data) => {
      err
        ? res.send({ code: 1, data: `> 非法请求！` })
        : res.send({ code: 1, data: data });
    });
  } else {
    res.send({ code: 0, msg: "非法请求" });
  }
});

// 获取图片
router.post("/getAdminImg", function (req, res) {
  let imgname = AES.get(req.body.imgKey);
  let userkey = AES.get(req.body.userKey);
  let username = AES.get(req.cookies.webnote);

  if (isUser(req.cookies.webnote) && imgname) {
    if (username === userkey) {
      res.send({
        code: 1,
        data: `data:image/${imgname.split(".").pop()};base64,${fs.readFileSync(
          `${userPath}/${username}/img/${imgname}`,
          "base64"
        )}`,
      });
    } else if (req.body.userKey === undefined) {
      res.send({
        code: 1,
        data: `data:image/${imgname.split(".").pop()};base64,${fs.readFileSync(
          `${rootPath}/img/${imgname}`,
          "base64"
        )}`,
      });
    } else {
      res.send({ code: 0, msg: "没有权限" })
    }
  } else {
    res.send({ code: 0, msg: "非法请求！" })
  }
});

// 是不是用户
function isUser(str) {
  return fs.readdirSync(userPath).includes(AES.get(str));
}

// 脱敏
function sliceIp(str) {
  return str.slice(0, str.lastIndexOf(".") + 1) + "***";
}
function slice2(str) {
  return str.slice(0, 2) + "**********";
}

module.exports = router;

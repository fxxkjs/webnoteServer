### PowerShell 一键连接服务器

>  1. 生成密钥对（自行百度）。
>  2. 在 C:\用户\userName\\.ssh\下新建config文件写入

```
Host al 自定义
User root 用户名
Hostname 39.107.89.187 ip
IdentityFile C:\Users\super\.ssh\al.pem 密钥路径
```

> 3. 右键密钥 - 属性 - 安全 - 高级 - 禁用继承 - 从此对象中删除所有已继承的权限 - 添加 - 选择主体 - 输入userName（C:\用户\userName\\.ssh中文件夹的名字）- 确定 - 基本权限只保留读取 - 确定后退出。

> 4. 在PowerShell中执行 ssh al  即执行 ssh root@39.107.89.187 -i keypath

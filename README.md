### CentOS7 中文文件名乱码
```
下载依赖
yum -y install convmv
将md下所有文件名递归转码为UTF-8
convmv -f GBK -t UTF-8 --notest -r path/md/*
```
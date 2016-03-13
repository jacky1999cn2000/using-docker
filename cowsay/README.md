```javascript
FROM debian

MAINTAINER Liang Zhao <liang.zhao83@gmail.com>
RUN apt-get update && apt-get install -y cowsay fortune
COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
```
1. 以debian为基础image
2. 安装cowsay&fortune
3. 再将host上Dockerfile当前的目录下的entrypoint.sh文件拷贝到container的根目录下(entrypoit.sh记住要chmod +x)
4. ENTRYPOINT中执行该文件



```
#!/bin/bash
if [ $# -eq 0 ]
then
  /usr/games/fortune | /usr/games/cowsay
else
/usr/games/cowsay "$@"
fi
```
如果command的参数为0($#),那么引用fortune中的话传递给cowsay;否则使用传进来的参数($@)

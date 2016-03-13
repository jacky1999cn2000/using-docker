```
$ docker pull redis

$ docker run --name myredis -d redis

$ docker run --rm -it --link myredis:redis redis /bin/bash
root@ca38735c5747:/data# redis-cli -h redis -p 6379
redis:6379> ping
PONG
redis:6379> set "abc" 123
OK
redis:6379> get "abc"
"123"
redis:6379> exit
root@ca38735c5747:/data# exit
exit
```
1. docker pull redis
2. 以后台模式run redis(container名为myredis)
3. 在另一个terminal里，以-it模式run redis进入/bin/bash模式,并link之前run的myredis container,alias为redis
4. 在bash中使用redis-cli来与之前的redis container互动

============
```
$ docker run --rm -it --link myredis:redis redis /bin/bash
root@09a1c4abf81f:/data# redis-cli -h redis -p 6379
redis:6379> set "persistence" "test"
OK
redis:6379> save
OK
redis:6379> exit
root@09a1c4abf81f:/data# exit
exit
$ docker run --rm --volumes-from myredis -v $(pwd)/backup:/backup debian cp /data/dump.rdb /backup/
$ ls backup
dump.rdb
```
0. 假定myredis container还在运行
1. 在另一个terminal里，以-it模式run redis进入/bin/bash模式,并link之前run的myredis container,alias为redis
2. 在bash中使用redis-cli来与之前的redis container互动,并save数据(redis默认保存到/data/dump.rdb)
3. 退出后用另一个terminal里运行debian image：--volumes-from myredis命令让myredis container的文件系统mount到该debian container上，通过-v $(pwd)/backup:/backup命令将host机器上当前目录下的/backup文件夹和debian container的/backup文件夹关联，最后执行cp /data/dump.rdb /backup/命令将debian container的/data/dump.rdb文件拷贝到debian container的/backup/文件夹里面
4. debian container执行完上述命令后就自行退出了,这时在host机器上ls backup会看到dump.rdb文件,因为host机器上的/backup文件夹和debian container的/backup/文件夹关联了

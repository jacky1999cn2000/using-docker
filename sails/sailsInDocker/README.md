# sailsInDocker

这个dockerized app是用来利用amouat/dnmonster的服务(不同的字符串对应不同的图片)，用sails request这个服务，然后将获得的图片返回

Javascript controller
```javascript
monster: function (req, res){
  return request('http://dnmonster:8080/monster/'+req.param('name')+'?size=80').pipe(res);
}
```

Dockerfile
```javascript
FROM node:4 //基于node:4 image

RUN npm install sails -g //安装sails
RUN npm install nodemon -g //安装nodemon - nodemon在volumes mount后无法auto-refresh(http://www.ybrikman.com/writing/2015/05/19/docker-osx-dev/)

ADD package.json /src/package.json //# add only package.json so docker uses the cache to build image except when a dependency has changed

RUN cd src && npm install

ADD . /src //# add remaining source code to container so we can actually run the app

WORKDIR /src

EXPOSE 1337

CMD npm start
```

利用docker engine:
```
[docker pull amouat/dnmonster](https://hub.docker.com/r/amouat/dnmonster/)
docker run -d --name dnmonster amouat/dnmonster:latest
docker build -t sailsindocker .
docker run -d -p 1337:1337 --link dnmonster:dnmonster sailsindocker
```

利用docker-compose:

```
sailsindocker:
      image: sailsindocker
      ports:
       - "1337:1337"
      links:
       - dnmonster
dnmonster:
  image: amouat/dnmonster:latest
```

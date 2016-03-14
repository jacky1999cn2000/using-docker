#Using Docker

https://github.com/using-docker/

docker-machine ip default: get your host machine's ip address (if using docker tool-belt, the localhost is not your Mac, but the VM host) 
docker rm $(docker ps -lq): remove last exited container
docker rm $(docker ps -aq): remove all exited container

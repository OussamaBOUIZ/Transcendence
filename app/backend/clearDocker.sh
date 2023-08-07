#!/bin/sh

docker rm $(docker ps -aq) -f
docker rmi $(docker images -qa) -f
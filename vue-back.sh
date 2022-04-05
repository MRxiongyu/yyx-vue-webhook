#！/bin/bash
echo "开始执行shell"
cd /usr/projects/yyx-vue-back || exit
echo "先清除老代码"
git reset --hard origin/master
git clean
echo "拉取代码"
git pull origin master
echo "开始构建容器"
docker build -t yyx-vue-back:0.0.1 .
echo "删除旧容器"
docker stop yyx-vue-back-container
docker rm yyx-vue-back-container
echo '启动新容器'
docker container run -p 3000:3000 --name yyx-vue-back-container -d yyx-vue-back:0.0.1



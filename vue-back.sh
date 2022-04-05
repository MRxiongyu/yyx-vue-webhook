#！/bin/bash
echo "开始执行shell"
cd /usr/projects/yyx-vue-back || exit
echo "拉取代码"
git pull origin master
echo "开始构建容器"
docker build -t yyx-vue-back:0.0.1 .
echo "删除旧容器"
docker stop yyx-vue-back:0.0.1
docker rm yyx-vue-back:0.0.1
echo '启动新容器'
docker container run -p 3000:3000 --name yyx-vue-back-container -d yyx-vue-back:0.0.1



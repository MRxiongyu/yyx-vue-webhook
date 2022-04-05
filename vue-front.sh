#！/bin/bash
cd /usr/projects/yyx-vue-front || exit
echo '清除代码'
git reset --hard origin/master
git clean
echo '拉取最新代码'
git pull origin master
echo '开始打包代码'
npm install
npm run build
echo '开始构建'
docker build -t yyx-vue-front:0.0.1 .
echo '删除旧容器'
docker stop yyx-vue-front-container
docker rm yyx-vue-front-container
echo '启动新容器'
docker container run -p 80:80 --name yyx-vue-front-container -d yyx-vue-front:0.0.1

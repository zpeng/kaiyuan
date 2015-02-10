# deployment instructions

登陆EC2 instance后，获取最新代码
```
git clone https://github.com/zpeng/kaiyuan.git
```

安装node环境

```
```

TODO: launch from AMI

```
cd kaiyuan/AmazonNode/NodeServer/app/ServerWorker
git pull
npm install
bower install
node index.js 8080
```

http://localhost:8080/index.html

以上端口号根据需要随意改

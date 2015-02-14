# 测试及发布

### Local test

```
cd kaiyuan/AmazonNode/NodeServer/app/ServerWorker
git pull
npm install
bower install
node index.js 8080
```

http://localhost:8080/index.html

以上端口号根据需要随意改。(为什么80端口不能用？)


### Update EC2 server

登陆EC2 instance后，获取最新代码
```
cd kaiyuan/AmazonNode/scripts
./sshEC2.sh
```

```
cd kaiyuan/AmazonNode/scripts
./foreverstop.sh
git pull
./foreverstart.sh
```
- 用forever start是因为我们退出ec2后 server仍要运行
- 更新前要先把forever关掉


# EC2 安装node环境

### AWS Marketplace 
不用，因为免费的instance type只能选t1.micro。我们可以自己安装在略强大的t2.micro上

### t2.micro Ubuntu

```
cd kaiyuan/AmazonNode/scripts
./sshEC2.sh
```

```
sudo apt-get install build-essential
sudo apt-get install git
git clone https://github.com/zpeng/kaiyuan.git
kaiyuan/AmazonNode/scripts/nodeInstall.sh
sudo cp kaiyuan/AmazonNode/scripts/rc.local /etc/rc.local
```

修改rc.local的目的在于以后enable了balance loader后新的Instance能自动安装并启动node server

- TODO: (不用密码) git pull 最新版本
- cron task

### TODO: launch from our backup AMI


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
git clone https://github.com/zpeng/kaiyuan.git
```

# EC2 安装node环境

### AWS Marketplace 
不用，因为免费的instance type只能选t1.micro。我们可以自己安装在略强大的t2.micro上

### t2.micro Ubuntu

public DNS 
```
git clone https://github.com/zpeng/kaiyuan.git
./kaiyuan/scripts/init.sh
```
重启Instance


TODO: launch from our backup AMI



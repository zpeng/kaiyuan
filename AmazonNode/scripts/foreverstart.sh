#!/bin/bash

# node cannot start on port 80, so we set the iptables
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000

cd ~/kaiyuan/AmazonNode/NodeServer/app/ServerWorker

# Invoke the Forever module (to START our Node.js server).
forever start -al forever.log -ao out.log -ae err.log index.js 3000
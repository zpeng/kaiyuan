#!/bin/bash

START_SCRIPT=~/kaiyuan/AmazonNode/NodeServer/app/ServerWorke/index.js

# Invoke the Forever module (to START our Node.js server).
forever start -al forever.log -ao out.log -ae err.log $START_SCRIPT 3000

# node cannot start on port 80, so we set the iptables
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
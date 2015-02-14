#!/bin/bash
 
START_SCRIPT=~/kaiyuan/AmazonNode/NodeServer/app/ServerWorker/index.js

# Invoke the Forever module (to STOP our Node.js server).
forever stop $START_SCRIPT
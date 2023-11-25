#!/bin/bash

npm i
sls deploy
if [ $? -ne 0 ]; then
    echo "Deployment Failed: Reason - Serverless Deployment Failed"
    exit 1
fi
echo "Deployment Successful"
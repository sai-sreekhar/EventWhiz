#!/bin/bash

yarn run build

aws s3 rm s3://ethnus-event-management-frontend/ --recursive
if [ $? -ne 0 ]; then
    echo "Deployment Failed: Reason - Failed to remove files from S3"
    exit 1
fi

aws s3 cp dist/ s3://ethnus-event-management-frontend/ --recursive
if [ $? -ne 0 ]; then
    echo "Deployment Failed: Reason - Failed to copy files to S3"
    exit 1
fi

echo "Deployment Successful"
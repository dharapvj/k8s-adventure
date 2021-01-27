---
layout: layout2.njk
title: AWS Elastic Kubernetes Service
author: Vijay Dharap
timestamp: January 20, 2021 
tags: [eks, distribution,]
---


# {{ title }}

## Create EKS Cluster
Below commands will help you install eksctl binary on ubuntu and use it to create EKS cluster quickly.

``` shell
# install eksctl
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version

# create cluster
eksctl create cluster --name vj-eks-1 --version 1.18 --region ap-south-1 --nodegroup-name eks-basic-nodes --nodes 1 --nodes-min 1 --nodes-max 1 --with-oidc --ssh-access --ssh-public-key dharapvv --managed --node-volume-size=30

# delete the cluster when work is done
eksctl delete cluster --name vj-eks-1 --region ap-south-1
```

## Cluster Autoscaler
[Follow instructions here to add and test Cluster Autoscaling in EKS](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html)

## Using AWS EIP CNI and pod networking security via AWS Sec Groups
FIXME - It did not work as per my expectations in my trials

## Usage of AWS IAM Authentication (EKS Authentication)


## Delete EKS Cluster
``` shell
eksctl delete cluster --name vj-eks-1 --region ap-south-1
```

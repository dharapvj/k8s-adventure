---
layout: layout2.njk
title: Minikube
author: Vijay Dharap
timestamp: January 20, 2021 
tags: [distro, lean, quickstart]
---

# {{ title }}

[Minikube](https://minikube.sigs.k8s.io/docs/) is one of the most basic and simplest way to get acquainted with Kubernetes. It creates single node cluster to experiment in matter of couple of minutes on your local machine.

## Install and start the cluster
``` shell
# download and install
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# start
minikube start
```

## Addons
``` shell
minikube addons list
minikube addons enable ingress
```

## Caveats
* Basically, Minikube is best suited for testing kubernetes on local OS. If you use remote machine with CLI only, accessing services is pretty hard.
* Using LoadBalancer service needs `minikube tunnel` command and it only creates a temporary load balancer.
* You will not get external IP even if you use service of type NodePort.

## Delete the cluster
``` shell
minikube stop
# If you want delete all the pods and services permanently, then...
minikube delete
```
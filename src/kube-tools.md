---
layout: layout2.njk
title: Basic tools to interact with Kubernetes
author: Vijay Dharap
timestamp: January 20, 2021 
tags: [helm, ingress, dashboard, monitoring, smoke-testing, validation]
---
# {{ title }}

The basic tools for working in Kubernetes environment are kubectl and helm. These binaries are to be installed on your local development machine. They are client binaries and using them you can connect and interact with kubernetes cluster.

## Kubectl
Install the kubectl tool using commands below.
``` shell
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
# If you do not have sudo access - install it locally
mkdir -p ~/.local/bin/kubectl
mv ./kubectl ~/.local/bin/kubectl
# and then add ~/.local/bin/kubectl to $PATH

# test kubectl
kubectl version --client
```

## Helm (v3)
Run below commands for getting helm v3 installed.

``` shell
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```
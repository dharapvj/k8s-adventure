---
layout: layout2.njk
title: AKS - Azure Kubernetes Service
author: Vijay Dharap
timestamp: January 20, 2021 
tags: [aks, distribution,]
---


# {{ title }}

## Create AKS Cluster
Below commands will help you install eksctl binary on ubuntu and use it to create EKS cluster quickly.

``` shell
# install azure CLI on ubuntu using one command
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
# do aAzure Login and register the services, if not registered already.
az login
az provider register --namespace Microsoft.OperationsManagement
az provider register --namespace Microsoft.OperationalInsights

# find out supported k8s versions in your region. You need jq installed for this command to work
az aks get-versions --location centralindia | jq .orchestrators[].orchestratorVersion

# install a minimal and cheap AKS cluster created
az aks create --resource-group k8s-adventure --name vj-aks-1 --node-count 1 --enable-addons monitoring --enable-cluster-autoscaler  --kubernetes-version 1.19.6 --ssh-key-value ~/.ssh/dharapvv.pub --location centralindia --max-count 3 --min-count 1 --node-vm-size Standard_B2s

# Get kubeconfig for this above cluster
az aks get-credentials --resource-group k8s-adventure --name vj-aks-1

# delete the cluster when work is done
az aks delete --resource-group k8s-adventure --name vj-aks-1
```

## Using aad-pod-identity Provider to access Azure Resources

Follow [this article](../cloud-access/aad-pod-identity) to understand how you can use aad-pod-identity app to allow secure access to Azure resources from your pod. Each pod gets specific set of permissions to access desired Azure resources - governed by custom Identity which you create in Azure separately and assign it to pod via annotations.
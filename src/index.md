---
layout: layout2.njk
title: Home
author: Vijay Dharap
timestamp: July 23, 2020 
tags: [kubernetes, k8s, explore, adventures, index]
---

# {{ title }}

## Setting up your developer environment terminal
* [bash profile settings](./bash-settings)
* [byobu](./byobu)
* [Kubernetes tools](./kube-tools) - kubectl, helm
* kubectx, kubens, kube-ps1, k, complete alias
* Free domain name (TLD)
* Things to setup in AWS Account e.g. Route53 hosted zone
* Things to setup in Azure Account
* your common ssh-key for nodes

## Installation of Simpler trial Kubernetes Distributions
* [k3s](./k3s)
* [Minikube](./minikube)
* Kind

## Installation of Production Grade Kubernetes Distributions
* [KOPS](./kops)
* [EKS](./eks)
* [AKS](./aks)
* [Kubermatic KubeOne](./kubeone)
* Kubespray

## Typical things to validate various Kubernetes features

Please access [deploy](./deploy) page to access exact command to deploy these items in your cluster. 

* Ingress Controller
* Kubernetes Dashboard
* Monitoring
* podinfo deployment
* Autoscaling testing (both HPA and cluster)
* Storage testing

## Installation of Multi-cluster Managers
* Kubermatic Kubernetes Platform (kkp)
* Rancher (To be added)

## Explored Features

### Storage
* Longhorn (on AWS KOPS)
* EFS

### Security
* Using Hashicorp Vault for secrets. (Usage via In-cluster installation with Consul)
* [Authentication via OIDC using Keycloak](./oauth/) / Dex

### Auto-scaling
* Pod Autoscaling via [Horizontal Pod Autoscaler](./hpa) ( KOPS, EKS)
* Node autoscaling via Cluster Autoscaler (EKS) FIXME

### Automated DNS Management for services
* [External DNS in KOPS](./external-dns)

### Access native cloud resouces from pods
* [kube2iam](./cloud-access/kube2iam) 
* [aad-pod-identity](./cloud-access/aad-pod-identity)
* gke workload identity

### Cost Optimizations
* [Using spot instances in AWS](./aws-spot-instances)

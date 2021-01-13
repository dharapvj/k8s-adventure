---
layout: layout2.njk
title: Home
author: Vijay Dharap
timestamp: July 23, 2020 
tags: [more, tags]
---

# {{ title }}

## Setting up your developer environment terminal
* [bash profile settings](./bash-settings)
* [byobu](./byobu)
* Kubernetes tools - kubectl, helm
* kubectx, kubens, kube-ps1, k, complete alias
* Free Root DNS
* Things to setup in AWS Account e.g. Route53 hosted zone
* Things to setup in Azure Account
* your common ssh-key for nodes

## Installation of Simpler trial Kubernetes Distributions
* k3s
* Minikube
* Kind

## Typical things to validate various Kubernetes features
* Ingress Controller
* Kubernetes Dashboard
* Monitoring
* podinfo deployment
* Autoscaling testing (both HPA and cluster)
* Storage testing

## Installation of Production Grade Kubernetes Distributions
* [KOPS](./kops)
* EKS
* AKS
* Kubermatic KubeOne
* Kubespray

## Installation of Multi-cluster Managers
* Kubermatic Kubernetes Platform (kkp)
* Rancher (To be added)

## Explored Features

### Storage
* Longhorn (on AWS KOPS)
* EFS

### Security
* Using Hashicorp Vault for secrets. (Usage via In-cluster installation with Consul)

### Auto-scaling
* Pod Autoscaling via Horizontal Pod Autoscaler ( KOPS, EKS)
* Node autoscaling via Cluster Autoscaler (EKS)

### WIP ( External-DNS setup)

### WIP Access cloud resouces via kube2iam / aad-pod-identity / gke workload identity etc


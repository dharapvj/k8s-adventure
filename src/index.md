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

## Installation of Production Grade Kubernetes Distributions
* [KOPS](./kops)
* EKS
* AKS
* Kubermatic KubeOne
* Kubespray

## Typical things to validate various Kubernetes features
Commands below are written for `Helm v3`. Same commands cannot be used for `Helm v2`. Please adapt the commands as needed.
* __Ingress Controller__ - Ingress controller should be installed first so that other components can be accessed via ingress.
``` shell
kubectl create ns ingress-nginx
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx -f ingress-nginx
```
* __Kubernetes Dashboard__ - Kubernete Dashboard.
``` shell
cd deploy
kubectl create ns dashboard
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm repo update
helm upgrade --install k8s-dashboard kubernetes-dashboard/kubernetes-dashboard -f k8s-dashboard.yaml -n dashboard
```
* Monitoring
``` shell
cd deploy
kubectl create ns monitoring

# install prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm upgrade --install prometheus prometheus-community/prometheus --version 13.0.1 -f prometheus.yaml -n monitoring

# install grafana
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm upgrade --install grafana grafana/grafana --version 6.1.16 -f grafana.yaml -n monitoring
```
* podinfo deployment
``` shell
cd deploy
kubectl apply -k github.com/stefanprodan/podinfo//kustomize
kubectl apply -f podinfo.yaml
```
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

### Auto-scaling
* Pod Autoscaling via Horizontal Pod Autoscaler ( KOPS, EKS)
* Node autoscaling via Cluster Autoscaler (EKS)

### WIP ( External-DNS setup)

### WIP Access cloud resouces via kube2iam / aad-pod-identity / gke workload identity etc


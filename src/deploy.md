---
layout: layout2.njk
title: Typical Deployments for cluster validation
author: Vijay Dharap
timestamp: January 20, 2021 
tags: [helm, ingress, dashboard, monitoring, smoke-testing, validation]
---
# {{ title }}

Commands below are written for `Helm v3`. Same commands cannot be used for `Helm v2`. Please adapt the commands as needed.
* __Ingress Controller__ - Ingress controller should be installed first so that other components can be accessed via ingress.
``` shell
kubectl create ns ingress-nginx
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx
```
* __Kubernetes Dashboard__ - Kubernete Dashboard.
``` shell
cd deploy
kubectl create ns dashboard
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm repo update
helm upgrade --install k8s-dashboard kubernetes-dashboard/kubernetes-dashboard -f k8s-dashboard.yaml -n dashboard
```
* __Monitoring__
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
* __podinfo__ deployment
``` shell
cd deploy
kubectl apply -k github.com/stefanprodan/podinfo//kustomize
kubectl apply -f podinfo.yaml
```
* __Autoscaling__ testing (both HPA and cluster)
For HPA installation and testing please go to [HPA](../hpa) page.
Cluster Autoscaler FIXME

* Storage testing
Longhorn FIXME

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
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

kubectl create ns ingress-nginx
# if deploying on AWS KOPS. This setups HTTPS and ACM certificate. (Must adjust ACM cert ARN in the yaml file)
helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx -f deploy/ingress.yaml
# if deploying on Azure/GCP
helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx -f deploy/ingress-ctrl-non-aws.yaml

```
* __Kubernetes Dashboard__ - Kubernete Dashboard.
``` shell
cd deploy
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm repo update
kubectl create ns dashboard
helm upgrade --install k8s-dashboard kubernetes-dashboard/kubernetes-dashboard -f k8s-dashboard.yaml -n dashboard

```
* __Monitoring__
``` shell
cd deploy
kubectl create ns monitoring

# WARN: In some kubernetes distributions, you may need to add a default StorageClass. If prometheus pods in below install remain pending for PVCs.. check for storageclass first.
# use storageclass-*.yaml to create the same first
# install prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm upgrade --install prometheus prometheus-community/prometheus --version 13.0.1 -f prometheus.yaml -n monitoring

# install grafana
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm upgrade --install grafana grafana/grafana --version 6.1.16 -f grafana.yaml -n monitoring

```

__Connect Grafana with Prometheus and start monitoring your cluster__
* After logging into grafana as admin, you can add datasource of type prometheus. For the server URL, give value as `http://prometheus-server/prometheus` and save.
* Once prometheus is connected, you can look at monitoring data by importing some of the popular grafana dashboards like 9614 (Node Exporter Full), 315 (kubernetes cluster monitoring), 10518, 3149, 4686, App metrics 1471, 8685, 5228, etc. There are way too many dashboards to list all good ones. Please explore and learn.  


* __podinfo__ deployment
``` shell
cd deploy
kubectl apply -k github.com/stefanprodan/podinfo//kustomize
kubectl apply -f podinfo.yaml
```
* __Autoscaling__ testing (both HPA and cluster)
For HPA installation and testing please go to [HPA](../hpa) page.
Cluster Autoscaler FIXME

* __Storage__ testing
Longhorn FIXME

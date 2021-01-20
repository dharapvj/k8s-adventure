---
layout: layout2.njk
title: Horizontal Pod Autoscaler
author: Vijay Dharap
timestamp: January 20, 2021 
tags: [hpa, autoscaling, metrics]
---

# {{ title }}

[Horizontal Pod Autoscaler](FIXME) (HPA) is a technology by which kubernetes cluster can scale the number of replicas for a given deployment automatically.

It does this by using metric gathered by metrics server. Some of the managed kubernetes distributions provide specific instructiosn to enable metrics server first. Please use those before enabling and testing HPA

## KOPS Specific instructions
Make sure you are using right release tag for the instructions. From v1.19 the process to enable metrics server has become a LOT easier.
[Install metrics-server on KOPS v1.18](https://github.com/kubernetes/kops/tree/release-1.18/addons/metrics-server)

## EKS specific instructions
FIXME

## Verify that Metrics server is running.
First of all - it takes about 5 minutes for metrics server to start reporting metrics after installation.
``` shell
kubectl top node
kubectl top pod
```

## Enable HPA for the given deployment
``` shell
# Let us deploy a sample application with considerable amount of CPU usage.
# source code for this app can be seen at https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/
kubectl apply -f https://k8s.io/examples/application/php-apache.yaml
# Enable Autoscaling with CPU threshold at 50m
kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10
# validate HPA is setup properly. If you get "Unknown" in Target column, your metrics server is not working properly.
kubectl get hpa
```

## Test HPA
Run following in separate shell as this command blocks the terminal, until you exit
``` shell
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://php-apache; done"
```
Now if you again check your HPA, you should see additional replicas getting created in a minute or so.
``` shell
kubectl get hpa

# sample output
## The Target and Replicas
$ kubectl get hpa
NAME         REFERENCE               TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache   <unknown>/50%   1         10        1          60s
$ kubectl get hpa
NAME         REFERENCE               TARGETS    MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache   250%/50%   1         10        1          2m30s
$ kubectl get hpa
NAME         REFERENCE               TARGETS    MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache   250%/50%   1         10        4          2m37s
# now after stopping the load generator (Ctrl + C in other shell window) and waiting for about 5 minutes
$ kubectl get hpa
NAME         REFERENCE               TARGETS    MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache   0%/50%    1         10        7          8m28s
$ kubectl get hpa
NAME         REFERENCE               TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache   0%/50%    1         10        1          10m
```

## Autoscaling on mutliple and custom metrics
Please follow [this document](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#autoscaling-on-multiple-metrics-and-custom-metrics) for more advanced usage of HPA

---
layout: layout2.njk
title: Horizontal Pod Autoscaler
author: Vijay Dharap
timestamp: January 20, 2021 
tags: [hpa, autoscaling, metrics]
---

# {{ title }}

[Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) (HPA) is a technology by which kubernetes cluster can scale the number of replicas for a given deployment automatically.

It does this by using metric gathered by metrics server. Some of the managed kubernetes distributions provide specific instructiosn to enable metrics server first. Please use those before enabling and testing HPA

## KOPS Specific instructions
Make sure you are using right release tag for the instructions. From v1.19 the process to enable metrics server has become a LOT easier.
[Install metrics-server on KOPS v1.18](https://github.com/kubernetes/kops/tree/release-1.18/addons/metrics-server)

## EKS specific instructions
Follow instruction [here](https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html) to add metrics-server and then add autoscaling test aplication. Most of the instructions below are valid for EKS as well after metrics-server is installed from the link.

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

You can notice the load increase reported in targets column and then subsequent scaling up of replicas. After the load generator was stopped, you can see that load goes down. Replica count also comes down after about 5 minutes of cooling period.

``` shell
# sample output
$ kubectl get hpa -w
NAME         REFERENCE               TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache   0%/50%    1         10        1          2m52s
php-apache   Deployment/php-apache   250%/50%   1         10        1          3m48s
php-apache   Deployment/php-apache   250%/50%   1         10        4          4m4s
php-apache   Deployment/php-apache   250%/50%   1         10        5          4m18s

### stopping the load now
php-apache   Deployment/php-apache   73%/50%    1         10        5          4m48s
php-apache   Deployment/php-apache   0%/50%     1         10        5          5m49s
php-apache   Deployment/php-apache   0%/50%     1         10        5          10m
php-apache   Deployment/php-apache   0%/50%     1         10        1          10m
```

## Autoscaling on mutliple and custom metrics
Please follow [this document](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#autoscaling-on-multiple-metrics-and-custom-metrics) for more advanced usage of HPA

## Delete test application
kubectl delete deployment.apps/php-apache service/php-apache horizontalpodautoscaler.autoscaling/php-apache

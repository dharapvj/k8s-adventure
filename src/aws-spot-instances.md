---
layout: layout2.njk
title: Using spot instances in kubernetes cluster
author: Vijay Dharap
timestamp: Feb 3rd, 2021
tags: [aws, spot, kops, cost-optimization]
---

# {{ title }}

In AWS, you get about 30-60% cost saving if you can make use of spot instances to run your workload!

## Using spot instances in KOPS
By default KOPS will setup on-demand instances for worker nodes. But its quite cost effective to switch to spot instances. KOPS also have more complex strategies to allow you mixed mode so that you can specify some worker nodes to be on-demand and then rest of the capacity as spot so that you do not end up with losing entire capacity of worker node group, etc.

To use spot instances in KOPS, we must make use of yaml way to provision the cluster OR edit an existing cluster and add the option to specify spot instance pricing. You can find prevalent spot pricing in AWS Spot pricing page (under Pricing history).

``` yaml/4
apiVersion: kops.k8s.io/v1alpha2
kind: InstanceGroup
spec:
  machineType: t3a.small
  maxPrice: "0.0040"
```

You can verify if your cluster is actually using Spot instances or not by checking Spot requests page in AWS console.

## Using spot instances in EKS
Similar to KOPS, in case of EKS, if you are using `eksctl` to create your cluster, you can make use of cluster spec yaml file to specify that you would like to use spot instances for the specified managed node group.

``` yaml/2
managedNodeGroups:
  - name: YOUR_SPOT_NODE_GROUP
    spot: true
```


References:
* [KOPS ref](https://onica.com/blog/devops/aws-spot-instances-with-kubernetes-kops/)
* [EKS Ref](https://aws.amazon.com/blogs/containers/amazon-eks-now-supports-provisioning-and-managing-ec2-spot-instances-in-managed-node-groups/)
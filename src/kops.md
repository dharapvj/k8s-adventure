---
layout: layout2.njk
title: KOPS - Kubernetes OPerationS
author: Vijay Dharap
timestamp: July 23, 2020
tags: [kubernetes, distribution, production-grade]
---

# {{ title }}

[KOPS](https://kops.sigs.k8s.io/) is my favourite goto tool to setup full fledged Kubernetes distribution in matter of 5-6 minutes. KOPS has a lot of customization options so you can easily create a production grade kubernetes infrastructure in KOPS. Cluster upgrade, cluster autoscaling, etc. are also supported via configuration changes via [addons](https://kops.sigs.k8s.io/addons/). All the changes can be previewed first (dry-run) and then applied to cluster.

Important points about KOPS:
* KOPS supports AWS and GKE cloud only. 
* It also supports public and private clusters. 
* KOPS creates AutoScalingGroups (in AWS) for master and for nodes. You can easily scale horizontally and vertically by changing ASG (via [KOPS CLI](https://kops.sigs.k8s.io/cli/kops/). Direct AWS change are not required and recommended).
* All the changes in KOPS are expected to done via configuration changes. Entire configuration is expressed via YAML. Detaild documentation of cluster API is [here](https://kops.sigs.k8s.io/cluster_spec/).

Below cheatsheet can help you get kubernetes cluster created in AWS by running 5-6 commands.

``` shell
# read more here
https://kops.sigs.k8s.io/getting_started/aws
 
# name of your cluster. .k8s.local means private cluster
export NAME=kopsdemo.k8s.local

# must create one bucket for storage of kops artifacts.. and provide its reference below. Below bucket is my bucket. You must create your own.
export KOPS_STATE_STORE=s3://kops-sample-state-store

# AWS credentials for KOPS to use.. You can use AWS_PROFILE / AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY combination. The IAM user must have [sufficient](https://kops.sigs.k8s.io/getting_started/aws/#setup-iam-user) permissions.
export AWS_PROFILE=vj

# You can customize zones as per your convenience
kops create cluster --zones=ap-south-1a ${NAME}

# customize to provide your own public key. This will be used to allow ssh based login to master and worker nodes.
kops create secret --name ${NAME} sshpublickey admin -i ~/.ssh/dharapvv.pub

# You can skip --yes param below to dry-run your changes.
kops update cluster ${NAME} --yes
kops validate cluster --wait 10m

# Later on more customizations to instance groups etc can be done and cluster can be updated again
kops get ig
kops edit ig nodes
kops update cluster ${NAME} --yes

# If you want to delete the cluster, use below command
kops delete cluster --name ${NAME} --yes
```


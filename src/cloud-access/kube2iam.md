---
layout: layout2.njk
title: kube2iam - Access AWS resources from pod securely
author: Vijay Dharap
timestamp: February 2, 2021 
tags: [aws, kops, cloud-access,]
---

# {{ title }}

[Kube2IAM](https://github.com/jtblin/kube2iam) is a quite mature and wellknown tool allow pods deployed in kubernetes cluster in AWS to access AWS resources securely. e.g. Access s3 bucket to read or write / Connect to RDS using IAM Authentication etc.

## Pre-requesite
1. A Role which you want to attach to the pod. This role should have appropriate and minimal policies by which we all the pod to have access to required AWS resources.
2. Assume-role-policy for this role should allow this role be assumed by the worker-node role. In case of kops based cluster, it would be nodes.YOUR_CLUSTER_NAME.k8s.local

## Installation
You can install it by using helm-chart. Its important to update the `host.interface` field to have correct value. In a default KOPS installtion, it would be kubenet.. so the interface value needs to be `cbr0`. In case calico it should be `cali+`. Customized values are present in cloud-access/kube2iam.yaml

``` shell
helm repo add kube2iam https://jtblin.github.io/kube2iam/
helm upgrade --install kube2iam kube2iam/kube2iam -f cloud-access/kube2iam.yaml
```

### Applying custom role to the pods
You can make a custom role asssume different role by adding below annotation to the pod
`iam.amazonaws.com/role: arn:aws:iam::<your_acct_name>:role/your_custom_role`

## Verification
Assuming we attached AWS managed policy AmazonS3ReadOnlyAccess for the custom role and added below assume policy:

``` json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::064814169464:role/nodes.kopsdemo.k8s.local"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

and a sample pod.. like
``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: aws-cli
  labels:
    name: aws-cli
  annotations:
    iam.amazonaws.com/role: arn:aws:iam::064814169464:role/kube2iam-test-s3-reader-role
spec:
  containers:
  - image: fstab/aws-cli
    command:
      - "/home/aws/aws/env/bin/aws"
      - "s3"
      - "ls"
    name: aws-cli
```

and apply it using `kubectl apply -f kube2iam-test.yaml

If everything is setup correctly, you will see your s3 buckets listed in pod logs.
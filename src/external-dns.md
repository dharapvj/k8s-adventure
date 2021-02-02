---
layout: layout2.njk
title: external-dns - Automate creation of domain names based on ingress
author: Vijay Dharap
timestamp: February 2, 2021 
tags: [aws, route53, kops, external-dns]
---

# {{ title }}

[external-dns](https://github.com/kubernetes-sigs/external-dns) is a popular option with very wide support for DNS management on kubernetes. Typically, when you create a ingress with subdomain in `host` field, you would need to add additional DNS entry in your DNS provider (like Route53 in AWS) for this subdomain pointing to your ingress controller. External DNS automates these entry creations.

### Steps to setup pre-requisits, install and use External-DNS
1. Create hosted zone in Route53 (if you do not have it already). You can also make use of free domain name providers like freenom or dot.tk if you want a throwaway domain.
2. Add a new IAM policy which allows update the hosted zone.
Create IAM policy with below content. You should update `hostedzone/*` to `hostedzone/<your hosted zone id>` to make it more restrictive. 
``` json/9
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "route53:ChangeResourceRecordSets"
      ],
      "Resource": [
        "arn:aws:route53:::hostedzone/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "route53:ListHostedZones",
        "route53:ListResourceRecordSets"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```
3. Associate this policy with instance profile of KOPS works nodes
KOPS allows you to add below liens in your cluster spec to add this above policy to default node instance profile. Make sure you replace the ARN with the ARN of the policy which you defined in your AWS account.
``` yaml
spec:
  externalPolicies:
     node:
     - arn:aws:iam::<youraccount>:policy/<yourpolicyname>

```
4. Deploy ingress-controller helm-chart, if not already. (Refer [Deploy](../deploy) page for details)
4. Deploy external-dns helm-chart. Replace HOSTED_ZONE_ID and HOSTED_ZONE_NAME with your Route53 hosted zone details.
``` shell
helm upgrade --install external-dns \
  --set provider=aws \
  --set aws.zoneType=public \
  --set txtOwnerId=HOSTED_ZONE_ID \
  --set domainFilters[0]=HOSTED_ZONE_NAME \
  bitnami/external-dns
```
5. Test the setup by deploying a sample app with ingress (podinfo). Refer [Deploy](../deploy) page for details.
If you notice the `podinfo.yaml` in the deploy directory, you will see hostname added there. If the setup is correctly done, after the deployment, in about 2 minutes, the corresponding entry in Route53 will be created automatically.

FIXME - add screenshots

### References:
* https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md
* https://artifacthub.io/packages/helm/bitnami/external-dns
* https://kops.sigs.k8s.io/iam_roles/#adding-external-policies

---
layout: layout2.njk
title: Dashboard authentication using Keycloak
author: Vijay Dharap
timestamp: January 20, 2021 
tags: [Keycloak, authentication, dashboard, oidc, authorization]
---
# {{ title }}

## Steps to install OIDC authenticator and setup authentication
1. install keycloak
``` shell
curl -LO https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/latest/kubernetes-examples/keycloak.yaml
# above file has keycloak service as LoadBalancer. Please change the same to ClusterIP
kubectl apply -f keycloak.yaml
```
2. [create](https://www.keycloak.org/getting-started/getting-started-kube) realm, client, users and group in keycloak. Optionally, you can also connect to another OIDC server to delegate authentication.
3. Assign custom mappers for client scope "email" to add 
   a) groups of type "Group membership" for "groups" claim
   a) audience for "aud" claim
4. [Enable OIDC authentication in KOPS](https://github.com/kubernetes/kops/blob/master/docs/cluster_spec.md#oidc-flags-for-open-id-connect-tokens)
``` shell
kops edit cluster ${NAME}
# add below 
spec:
   kubeAPIServer:
     oidcClientID: k8s-dashboard
     oidcGroupsClaim: groups
     oidcIssuerURL: https://keycloak.kops.dh4r4pvj.ga/auth/realms/k8s-user
     oidcUsernameClaim: email

# save the changes
kops update cluster ${NAME} --yes
kops rolling-update cluster --cloudonly --yes
````
5. deploy [kubernetes dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/#deploying-the-dashboard-ui) and keycloak-proxy, clusterroles and clusterrolebinding
``` shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
kubectl apply -f dashboard-proxy.yaml # this file is present in same directory in github
```
6. Login as adm and regular user (no good way to logout)
7. Profit!!


### References:
1. https://itnext.io/protect-kubernetes-dashboard-with-openid-connect-104b9e75e39c
1. https://medium.com/@int128/kubectl-with-openid-connect-43120b451672
1. https://devopstales.github.io/sso/k8s-dasboard-auth/

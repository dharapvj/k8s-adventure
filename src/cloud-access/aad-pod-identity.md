---
layout: layout2.njk
title: AKS - aad-pod-identity - Access Azure resources from pod securely
author: Vijay Dharap
timestamp: February 2, 2021 
tags: [aks, cloud-access,]
---

# {{ title }}

Using [AAD-pod-identity](https://github.com/Azure/aad-pod-identity) provider, the pods can securely access Azure resources based on the Roles assigned to their identities.

Below steps are based on the [guide](https://azure.github.io/aad-pod-identity/docs/demo/standard_walkthrough/) from aad-pod-identity documentation.

For aad-pod-identity based access to work properly, we need setup below identity assigements
``` shell
az role assignment create --role "Managed Identity Operator" --assignee <id_of_agentpool_managed_identity> --scope /subscriptions/YOUR_SUBSCRIPTION_ID/resourcegroups/MC_k8s-adventure_vj-aks-1_centralindia
az role assignment create --role "Virtual Machine Contributor" --assignee <id_of_agentpool_managed_identity> --scope /subscriptions/YOUR_SUBSCRIPTION_ID/resourcegroups/MC_k8s-adventure_vj-aks-1_centralindia
````

Now, lets do actual installation of the add-pod-identity helm chart and sample apps.

``` shell
# Setup few variables
export SUBSCRIPTION_ID="YOUR_AZURE_SUBSCRIPTION_ID"
export RESOURCE_GROUP="k8s-adventure"
export CLUSTER_NAME="vj-aks-1"
export IDENTITY_RESOURCE_GROUP="$(az aks show -g ${RESOURCE_GROUP} -n ${CLUSTER_NAME} --query nodeResourceGroup -otsv)"
export IDENTITY_NAME="demo"
helm repo add aad-pod-identity https://raw.githubusercontent.com/Azure/aad-pod-identity/master/charts
# helm install aad-pod-identity aad-pod-identity/aad-pod-identity
# If you used kubenet as your CNI, please enable usage with kubenet 
helm upgrade --install aad-pod-identity aad-pod-identity/aad-pod-identity --set nmi.allowNetworkPluginKubenet=true
```
Now we create an identity and assign it a role "Reader" at Resource group scope. In reality, we should assign right amount of read and write role combination with minimal scope as per the requirement of access from the pod.
``` shell
az identity create -g ${IDENTITY_RESOURCE_GROUP} -n ${IDENTITY_NAME}
export IDENTITY_CLIENT_ID="$(az identity show -g ${IDENTITY_RESOURCE_GROUP} -n ${IDENTITY_NAME} --query clientId -otsv)"
export IDENTITY_RESOURCE_ID="$(az identity show -g ${IDENTITY_RESOURCE_GROUP} -n ${IDENTITY_NAME} --query id -otsv)"
export IDENTITY_ASSIGNMENT_ID="$(az role assignment create --role Reader --assignee ${IDENTITY_CLIENT_ID} --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${IDENTITY_RESOURCE_GROUP} --query id -otsv)"
```
Deploy PodIdentity and AzureIdentityBinding CRDs in AKS cluster
``` shell
cat <<EOF | kubectl apply -f -
apiVersion: "aadpodidentity.k8s.io/v1"
kind: AzureIdentity
metadata:
  name: ${IDENTITY_NAME}
spec:
  type: 0
  resourceID: ${IDENTITY_RESOURCE_ID}
  clientID: ${IDENTITY_CLIENT_ID}
EOF

cat <<EOF | kubectl apply -f -
apiVersion: "aadpodidentity.k8s.io/v1"
kind: AzureIdentityBinding
metadata:
  name: ${IDENTITY_NAME}-binding
spec:
  azureIdentity: ${IDENTITY_NAME}
  selector: ${IDENTITY_NAME}
EOF
```

Now lets deploy sample app to see if we can use the identity in the pod to query / interact with Azure.
For a pod to match an identity binding, it needs a label with the key `aadpodidbinding` whose value is that of the `selector:` field in the AzureIdentityBinding.

``` shell
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    aadpodidbinding: $IDENTITY_NAME
spec:
  containers:
  - name: demo
    image: mcr.microsoft.com/oss/azure/aad-pod-identity/demo:v1.7.1
    args:
      - --subscriptionid=${SUBSCRIPTION_ID}
      - --clientid=${IDENTITY_CLIENT_ID}
      - --resourcegroup=${IDENTITY_RESOURCE_GROUP}
    env:
      - name: MY_POD_NAME
        valueFrom:
          fieldRef:
            fieldPath: metadata.name
      - name: MY_POD_NAMESPACE
        valueFrom:
          fieldRef:
            fieldPath: metadata.namespace
      - name: MY_POD_IP
        valueFrom:
          fieldRef:
            fieldPath: status.podIP
  nodeSelector:
    kubernetes.io/os: linux
EOF
```

If everything was setup correctly, you will logs in `kubectl logs demo` similar to below:
``` shell
...
successfully doARMOperations vm count 1
successfully acquired a token using the MSI, msiEndpoint(http://169.254.169.254/metadata/identity/oauth2/token)
successfully acquired a token, userAssignedID MSI, msiEndpoint(http://169.254.169.254/metadata/identity/oauth2/token) clientID(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
successfully made GET on instance metadata
```

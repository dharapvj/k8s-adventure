---
layout: layout2.njk
title: Kubermatic KubeOne - Quick HA Production Grade kubernetes cluster
author: Vijay Dharap
timestamp: March 18, 2021
tags: [kubernetes, distribution, production-grade]
---

# {{ title }}

[KubeOne](https://docs.kubermatic.com/kubeone/) is profession production grade kubernetes distribution by Kubermatic. It helps creation of HA cluster across many different cloud providers like AWS, Azure, GCP, hetzner, as well as on-prem like OpenStack and vSphere. You can get a cluster setup done in about 10 minutes. It also provides declarative configuration using yaml based configuration. It uses Cluster-API and MachineController APIs to easily add, remove, upgrade, scale the nodes.

## Installation
1. Get Kubeone by running `curl -sfL get.kubeone.io | sh` in terminal. This will install kubeone binary in your `/usr/local/bin` folder and unpack example terraform config in current directory. The unpacked terraform example are present in `kubeone` directory of this github repository.
1. Enable the shell completion via `source <(kubeone completion zsh)` / `source <(kubeone completion bash)` depending upon your shell.
1. navigate to appropriate example directory for your trial. e.g. `examples/terraform/aws` for setting up Kubeone on AWS.
1. Setup AWS profile via `export AWS_PROFLE=xxx` / credentials.
1. If you are using GCP you can use `export GOOGLE_CREDENTIALS=xxxx.json` to set credentials json path.
1. Create minimal `terraform.tfvars` to customize terraform variables. You can customize every variable in terraform.
    ```hcl
    # tfvars for AWS
    cluster_name = "vj1"
    ssh_public_key_file = "~/.ssh/id_rsa.pub"
    # optional
    #aws_region="ap-south-1"
    ```
    OR
    ```hcl
    # tfvars for GCP
    cluster_name = "vj1"
    ssh_public_key_file = "~/.ssh/id_rsa.pub"
    project = "personal" #GCP project name
    # optional
    #aws_region="ap-south-1"
    ```
1. You will need to have ssh key specified above added in ssh-agent. ([Option exists to provide it directly as well without using sss-agent](https://docs.kubermatic.com/kubeone/v1.2/prerequisites/ssh/)). Use below script to add keys to ssh-agent.
    ```shell
    eval `ssh-agent`
    ssh-add ~/.ssh/id_rsa # or any other PEM private key!
    ```
1. Once this done, create infrastructure using terraform
    ```shell
    terraform init
    terraform plan
    # for everything else except GCP
    terraform apply
    # If using GCP... use below apply commands after downlading the service account json
    # export GOOGLE_CREDENTIALS=$(cat ./XXXX.json)
    #terraform apply -var=control_plane_target_pool_members_count=1

    # Copy the output in json format so that kubeone can use it to install infra on it
    terraform output -json > tf.json
    ```
1. Now create the minimal kubeone config yaml file.
1. Use kubeone to create k8s cluster
    ```shell
    kubeone apply --manifest kubeone.yaml -t tf.json --verbose
    ```
1. Watch cluster getting setup
    ```shell
    # Replace <CLUSTER_NAME> with name of the cluster you provided in kubeone config yaml.
    export KUBECONFIG=./<CLUSTER_NAME>-kubeconfig
    kubectl get md,ms,ma,node -n kube-system
    kubectl get node -w
    ```
1. Post installation, a kubeconfig file prefix as your project name will be created in the current working directory. You can use that kubeconfig to connect to new kubeone kubernetes cluster.
1. You can also have additional addons
1. To destroy
    ```shell
    kubeone reset --manifest kubeone.yaml -t tf.json --verbose
    terraform destroy
    ```
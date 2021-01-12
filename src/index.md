---
layout: layout2.njk
title: My Kubernetes Adventures
author: Vijay Dharap
timestamp: July 23, 2020 
tags: [more, tags]
---

# {{ title }}

## Setting up your developer environment terminal
* bash profile settings
* byobu
* Kubernetes tools - kubectl, helm
* kubectx, kubens, kube-ps1, k, complete alias
* Free Root DNS
* Things to setup in AWS Account e.g. Route53 hosted zone
* Things to setup in Azure Account
* your common ssh-key for nodes

# Installation of Simpler trial Kubernetes Distributions
* k3s
* Minikube
* Kind

# Typical things to validate various Kubernetes features
* Ingress Controller
* Kubernetes Dashboard
* Monitoring
* podinfo deployment
* Autoscaling testing (both HPA and cluster)
* Storage testing

## Installation of Production Grade Kubernetes Distributions
* KOPS
* EKS
* AKS
* Kubermatic KubeOne
* Kubespray

## Installation of Multi-cluster Managers
* Kubermatic Kubernetes Platform (kkp)
* Rancher (To be added)

## Explored Features

### Storage
* Longhorn (on AWS KOPS)
* EFS

### Security
* Using Hashicorp Vault for secrets. (Usage via In-cluster installation with Consul)

### Auto-scaling
* Pod Autoscaling via Horizontal Pod Autoscaler ( KOPS, EKS)
* Node autoscaling via Cluster Autoscaler (EKS)

### WIP ( External-DNS setup)

### WIP Access cloud resouces via kube2iam / aad-pod-identity / gke workload identity etc

{#
# {{ title }}

Demo of Eleventy based static site. This content is written using markdown file. The source of this file is present in source branch. Source branch is also the default branch for this repo.

## Code Syntax highlighting
Below block is highlighted for JS syntax. Eleventy uses prism as the syntax highlighter. You can use bunch themes with prism highlighter. Check css directory for few.
``` javascript
// https://github.com/preactjs/preact/blob/master/src/component.js

/**
 * Base Component class. Provides `setState()` and `forceUpdate()`, which
 * trigger rendering
 * @param {object} props The initial component props
 */
export function Component(props, context) {
	this.props = props;
	this.context = context;
}
```

## Table
Below table can help you understand how to read the code to understand how this usecase was implemented.
| File | Description |
| ---- | ----------- |
| index.md  | This is file which generated the html you are reading. |
| layout2.njk | TBD |

More information on how to add custom classes in markdown-it is available [here](https://www.npmjs.com/package/@toycode/markdown-it-class). In this section the table is added a custom class mapping to give it stripes. Configuration is available in `.eleventy.js` file

## Column splitting
---:2
### First column
This column gets 2/3 of total width.

![kitten 1](/img/pets/1.jpg){.special}
![kitten 2](/img/pets/2.jpg){.special}
![kitten 3](/img/pets/3.jpg){.special}
:--:1
### second column:
* This column takes 1/3 of the total width available for the main container.
* This sections also shows how to include images in the page
* More info on column splitting in markdown [here](https://www.npmjs.com/package/markdown-it-multicolumn).
:---

## Custom styling the header {.custom-header}
Can also work with inline text. *Hover over me*{.hvr-overline-from-left .diff-color}. 
This type of custom classes called `.special` is also added to the kitten images above.
More info on how to add custom attributes including classes to markdown is available [here](https://www.npmjs.com/package/markdown-it-attrs).

#}

https://docs.kubermatic.com/kubeone/master/quick_start/

export AWS_PROFILE=vj
eval `ssh-agent`
ssh-add ~/.ssh/dharapvv.pem
terraform plan
terraform apply
terraform output -json > tf.json
kubeone apply --manifest kubeone.yaml -t tf.json



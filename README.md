# reconnect-2025-red-team
Reconnect 2025 Red Team Workshop

Learn about Cross Site Scripting (XSS) attacks! This classic attack comes in many flavours.

Solutions to the 4 labs can be found in the [solutions.md](./solutions.md) file

## How to deploy
Log in using AWSKeys tool

### Set up Terraform env vars
Copy the [terraform/terraform.tfvars.template](./terraform/terraform.tfvars.template) file and name it `terraform/terraform.tfvars`.
- Set `instances` to the number of instances you want (maximum 15)
- Set `ssh_key_name` to the name of already-existing SSH key on AWS (you can make a new one on the [AWS EC2 KeyPairs console](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#KeyPairs)), e.g. `"reconnect-2025-red-team"`
- Set `ingress_cidr_blocks` to VPN Gateway IP Address, e.g. `["123.123.123.123/32"]`. You can add multiple cidr blocks. This is used for HTTP/HTTPS/SSH. Usually 1 IP address will be sufficient for everyone on the same VPN
- Set `hosted_zone_id` to the ID of your desired DNS, found on [Route 53 Hosted Zones](https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=us-west-2#), e.g. `ABC123XYZ`
- Set `hosted_zone_name` to your desired DNS, e.g. `pg.mydomain.com`

### Set up server env vars
> TODO: Move these env vars into the terraform inputs

> TODO: Replace userdata.sh instructions reading `git clone` to instead download a lambda from a secure S3 bucket. Shor term hack, either make the GitHub repo public or add a git token

- For deployment, manually edit [userdata.sh](./userdata.sh) where the server/.env is set. The defaults should be sufficient
- For localhost, copy `server/.env.template` to `server/.env`

### Run terraform
> TODO: Make `build.sh` copy `userdata.sh` into `terraform/web/userdata.sh`

> TODO: Make `state.tf` file to store `terraform.tfstate` on an S3 bucket

1. Run `./build.sh`
2. Run `cd terraform`, `terraform apply`
3. When finished, run `terraform destroy`

### Troubleshoot: Verify deployment
1. SSH into `reconnect-2025-red-0.pg.mydomain.com` (replace URL as needed)
2. Wait a minute then run `sudo cat /var/log/cloud-init-output.log`
  E.g. Latest Node JS may not install because glibc is out of date. Easiest fix for most modern Node JS is to update Amazon Linux image to latest

  
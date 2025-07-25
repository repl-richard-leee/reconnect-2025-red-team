output "instance_ids" {
  description = "IDs of the EC2 instances"
  value       = module.web[*].instance_id
}

output "instance_hostnames" {
  description = "Hostnames of the EC2 instances"
  value       = module.web[*].instance_hostname
}

output "instance_public_ips" {
  description = "Public IP addresses of the EC2 instances"
  value       = module.web[*].instance_public_ip
}

output "instance_private_ips" {
  description = "Private IP addresses of the EC2 instances"
  value       = module.web[*].instance_private_ip
}

output "security_group_ids" {
  description = "IDs of the security groups"
  value       = module.web[*].security_group_id
}

output "web_server_dns" {
  description = "Internal DNS names of the web servers"
  value       = module.web[*].web_server_dns
}

output "web_server_dns_records" {
  description = "DNS records for the web servers"
  value       = module.web[*].web_server_dns_record
}
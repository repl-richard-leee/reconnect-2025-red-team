output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.web_server.id
}

output "instance_hostname" {
  description = "Hostname of the EC2 instance"
  value       = aws_instance.web_server.public_dns
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.web_server.public_ip
}

output "instance_private_ip" {
  description = "Private IP address of the EC2 instance"
  value       = aws_instance.web_server.private_ip
}

output "web_server_dns" {
  description = "Internal DNS name of the web server"
  value       = aws_instance.web_server.public_dns
}

output "web_server_dns_record" {
  description = "DNS record for the web server"
  value = aws_route53_record.web_record.fqdn
}
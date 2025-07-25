resource "aws_route53_record" "web_record" {
  zone_id = var.hosted_zone_id
  name    = "reconnect-2025-red-${var.index}.${var.hosted_zone_name}"
  type    = "A"
  ttl     = 300
  records = [aws_instance.web_server.public_ip]
}
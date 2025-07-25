module "web" {
  count               = min(var.instances, 15)
  source              = "./web"

  prefix              = "${var.prefix}-web"
  index               = count.index
  ssh_key_name        = var.ssh_key_name
  ingress_cidr_blocks = var.ingress_cidr_blocks
  hosted_zone_id      = var.hosted_zone_id
  hosted_zone_name    = var.hosted_zone_name
  sg_id               = aws_security_group.sg.id
}
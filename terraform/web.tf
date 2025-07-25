module "web" {
  count        = min(var.count, 15)
  source       = "./web"

  prefix       = "${var.prefix}-web"
  index        = count.index
  ssh_key_name = var.ssh_key_name
}
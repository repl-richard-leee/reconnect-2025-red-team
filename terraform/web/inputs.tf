variable "prefix" {
  description = "Prefix for web resources"
  type        = string
}

variable "index" {
  type = number
}

variable "ssh_key_name" {
  description = "Name of the SSH key pair to use for the web server"
  type        = string
}

variable "hosted_zone_id" {
  description = "The ID of the Route 53 hosted zone"
  type        = string
  default     = "Z1X6COAMSSU4BO" # pg.replicondev.net
}

variable "hosted_zone_name" {
  description = "The name of the Route 53 hosted zone"
  type        = string
  default     = "pg.replicondev.net"
}
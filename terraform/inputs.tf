variable "prefix" {
  description = "Prefix for all resources"
  type        = string
  default     = "reconnect-2025-red-team"
}

variable "instances" {
  description = "Number of instances to create"
  type        = number
}

variable "ssh_key_name" {
  description = "Name of the SSH key pair to use for the web server"
  type        = string
}

variable "hosted_zone_id" {
  description = "The ID of the Route 53 hosted zone"
  type        = string
}

variable "hosted_zone_name" {
  description = "The name of the Route 53 hosted zone"
  type        = string
}

variable "ingress_cidr_blocks" {
  description = "CIDR blocks for ingress rules"
  type        = list(string)
}
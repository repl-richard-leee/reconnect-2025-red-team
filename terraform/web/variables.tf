variable "instance_name" {
  description = "Name for the EC2 instance"
  type        = string
  default     = "web-server"
}

variable "allowed_ip" {
  description = "IP address allowed to access the instance"
  type        = string
  default     = "10.190.66.76/32"
}
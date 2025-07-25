variable "prefix" {
  description = "Prefix for all resources"
  type        = string
  default     = "reconnect-2025-red-team"
}

variable "count" {
  description = "Number of instances to create"
  type        = number
  default     = 1
}

variable "ssh_key_name" {
  description = "Name of the SSH key pair to use for the web server"
  type        = string
  default     = "reconnect-2025-red-team"
}
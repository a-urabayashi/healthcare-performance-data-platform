variable "tf_state_bucket" {
  description = "Name of S3 bucket in AWS for storing TF state"
  default     = "healthcare-performance-data-platform-tf-state"
}

variable "tf_state_lock_table" {
  description = "Name of DynamoDB table for TF state locking"
  default     = "healthcare-performance-data-platform-tf-lock"
}

variable "project" {
  description = "Project name for tagging resources"
  default     = "healthcare-performance-data-platform"
}

variable "contact" {
  description = "Contact name for tagging resources"
  default     = "au@aurabayashi.onmicrosoft.com"
}
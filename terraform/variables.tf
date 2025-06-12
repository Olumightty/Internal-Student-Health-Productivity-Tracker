variable "table_name" {
  description = "Name of the DynamoDB table"
  type        = string
  default     = "health-productivity-db"
}

variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "accountId" {
  description = "AWS Account ID"
  type        = number
  default     = 654654306771
}

variable "api_name"{
    description = "API NAME"
    type        = string
    default     = "health-productivity-api"
}
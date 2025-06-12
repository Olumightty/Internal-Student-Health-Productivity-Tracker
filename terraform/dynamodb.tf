resource "aws_dynamodb_table" "logs_table" {
  name         = "${var.table_name}"
  billing_mode = "PAY_PER_REQUEST" # On-demand pricing (no need to manage capacity)

  hash_key     = "logId"
  

  attribute {
    name = "logId"
    type = "S" # S = String
  }


  tags = {
    Environment = "dev"
  }
}
# 1. Cognito User Pool
resource "aws_cognito_user_pool" "user_pool" {
  name = "health-productivity"

  auto_verified_attributes = ["email"]

  schema {
    name     = "email"
    required = true
    attribute_data_type = "String"
    mutable  = false
  }
}

# 2. Cognito User Pool Client
resource "aws_cognito_user_pool_client" "user_pool_client" {
  name         = "health-productivity"
  user_pool_id = aws_cognito_user_pool.user_pool.id

  generate_secret = false # Set true if using confidential clients

  allowed_oauth_flows = ["code"]
  allowed_oauth_scopes = ["email", "openid", "profile"]
  allowed_oauth_flows_user_pool_client = true
  supported_identity_providers = ["COGNITO"]

  callback_urls = [
    "http://localhost:5173/",
    "${var.redirect_url}" # Add more if needed
  ]

  logout_urls = [
    "http://localhost:5173/",
    "${var.redirect_url}"
  ]
}

# 3. User Pool Domain (hosted by AWS)
resource "aws_cognito_user_pool_domain" "user_pool_domain" {
  domain       = "health-prod-auth-domain" # Must be globally unique
  user_pool_id = aws_cognito_user_pool.user_pool.id
}
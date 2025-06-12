# Create IAM Role for Lambda
resource "aws_iam_role" "lambda_exec_role" {
  name = "health-prod-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })

}

#Attach Custom Policy
resource "aws_iam_role_policy" "lambda_policy" {
  name = "health-prod-policy"
  role = aws_iam_role.lambda_exec_role.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AllowDynamoDBReadWriteAccess",
                "Effect": "Allow",
                "Action": [
                    "dynamodb:PutItem",
                    "dynamodb:GetItem",
                    "dynamodb:Query",
                    "dynamodb:Scan"
                ],
                "Resource": "arn:aws:dynamodb:us-east-1:654654306771:table/${var.table_name}"
            }
        ]
    })
}


# Lambda: GET /log
resource "aws_lambda_function" "get_log" {
  function_name = "get-logs"
  runtime       = "python3.12"
  handler       = "main.lambda_handler" #name beside def
  role          = aws_iam_role.lambda_exec_role.arn

  filename         = "${path.module}/lambda_get/lambda_get.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda_get/lambda_get.zip")
}

# Lambda: POST /log
resource "aws_lambda_function" "post_log" {
  function_name = "add-log"
  runtime       = "python3.12"
  handler       = "main.lambda_handler" #name beside def
  role          = aws_iam_role.lambda_exec_role.arn

  filename         = "${path.module}/lambda_post/lambda_post.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda_post/lambda_post.zip")
}

# API Gateway REST API
resource "aws_api_gateway_rest_api" "log_api" {
  name = var.api_name
}

# Resource: /log
resource "aws_api_gateway_resource" "log_resource" {
  rest_api_id = aws_api_gateway_rest_api.log_api.id
  parent_id   = aws_api_gateway_rest_api.log_api.root_resource_id
  path_part   = "log"
}

# Method: GET /log
resource "aws_api_gateway_method" "get_log" {
  rest_api_id   = aws_api_gateway_rest_api.log_api.id
  resource_id   = aws_api_gateway_resource.log_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

# Integration: GET /log -> Lambda
resource "aws_api_gateway_integration" "get_log_integration" {
  rest_api_id = aws_api_gateway_rest_api.log_api.id
  resource_id = aws_api_gateway_resource.log_resource.id
  http_method = aws_api_gateway_method.get_log.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.get_log.invoke_arn
}

#CORS FOR GET REQUEST
resource "aws_api_gateway_method_response" "get_log" {
  rest_api_id = aws_api_gateway_rest_api.log_api.id
  resource_id = aws_api_gateway_resource.log_resource.id
  http_method = aws_api_gateway_method.get_log.http_method
  status_code = "200"

  response_parameters = {
    # "method.response.header.Access-Control-Allow-Headers" = true
    # "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

# Method: POST /log
resource "aws_api_gateway_method" "post_log" {
  rest_api_id   = aws_api_gateway_rest_api.log_api.id
  resource_id   = aws_api_gateway_resource.log_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

# Integration: POST /log -> Lambda
resource "aws_api_gateway_integration" "post_log_integration" {
  rest_api_id = aws_api_gateway_rest_api.log_api.id
  resource_id = aws_api_gateway_resource.log_resource.id
  http_method = aws_api_gateway_method.post_log.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.post_log.invoke_arn
}

#CORS FOR POST REQUEST
resource "aws_api_gateway_method_response" "post_log" {
  rest_api_id = aws_api_gateway_rest_api.log_api.id
  resource_id = aws_api_gateway_resource.log_resource.id
  http_method = aws_api_gateway_method.post_log.http_method
  status_code = "200"

  response_parameters = {
    # "method.response.header.Access-Control-Allow-Headers" = true
    # "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

# Method: OPTIONS /log
resource "aws_api_gateway_method" "options_log" {
  rest_api_id = aws_api_gateway_rest_api.log_api.id
  resource_id = aws_api_gateway_resource.log_resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# Integration: OPTIONS /log -> MOCK
resource "aws_api_gateway_integration" "options_log" {
  rest_api_id = aws_api_gateway_rest_api.log_api.id
  resource_id = aws_api_gateway_resource.log_resource.id
  http_method = aws_api_gateway_method.options_log.http_method
  type        = "MOCK"
  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

# Method: OPTIONS -> CORS Response
resource "aws_api_gateway_method_response" "options_log" {
  rest_api_id = aws_api_gateway_rest_api.log_api.id
  resource_id = aws_api_gateway_resource.log_resource.id
  http_method = aws_api_gateway_method.options_log.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

# Integration: OPTIONS -> CORS Response
resource "aws_api_gateway_integration_response" "options_log" {
  rest_api_id = aws_api_gateway_rest_api.log_api.id
  resource_id = aws_api_gateway_resource.log_resource.id
  http_method = aws_api_gateway_method.options_log.http_method
  status_code = aws_api_gateway_method_response.options_log.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  response_templates = {
    "application/json" = ""
  }
}

# Lambda permissions for API Gateway to invoke
resource "aws_lambda_permission" "allow_get_api" {
  statement_id  = "AllowAPIGatewayInvokeGet"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_log.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.log_api.execution_arn}/*/GET/log"
}

resource "aws_lambda_permission" "allow_post_api" {
  statement_id  = "AllowAPIGatewayInvokePost"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.post_log.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.log_api.execution_arn}/*/POST/log"
}

# Deploy the API
resource "aws_api_gateway_deployment" "log_api_deployment" {
  depends_on = [
    aws_api_gateway_integration.get_log_integration,
    aws_api_gateway_integration.post_log_integration
  ]

  rest_api_id = aws_api_gateway_rest_api.log_api.id
  
}

resource "aws_api_gateway_stage" "log_api_stage" {
  deployment_id = aws_api_gateway_deployment.log_api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.log_api.id
  stage_name    = "dev"
}
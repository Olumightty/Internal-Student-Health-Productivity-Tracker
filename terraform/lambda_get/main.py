import json
import boto3
from boto3.dynamodb.conditions import Key
from boto3.dynamodb.conditions import Attr

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
table_name = 'health-productivity-db'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
           
        queryParams = event.get('queryStringParameters', {})
        
        user_id = queryParams['userId']
        get_all = queryParams['getAll']
        

        if not user_id:
            return {
                'statusCode': 400,
                'headers': {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",  # or specific origin like "http://localhost:5173"
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
                },
                'body': json.dumps({'error': 'userId is required'})
            }

        if get_all == 'true':
            response = table.scan()
            print(response['Items'])

            return {
                'statusCode': 200,
                'headers': {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",  # or specific origin like "http://localhost:5173"
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
                    },
                'body': json.dumps({'logs': response['Items']})
            }
        
        response = table.scan(
            FilterExpression=Attr('userId').eq(user_id)
        )
        print(response['Items'])

        return {
            'statusCode': 200,
            'headers': {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",  # or specific origin like "http://localhost:5173"
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
                },
            'body': json.dumps({'logs': response['Items']})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",  # or specific origin like "http://localhost:5173"
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
                },
            'body': json.dumps({'error': str(e), 'event': event})
        }
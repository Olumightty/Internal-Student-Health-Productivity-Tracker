import json
import boto3
from datetime import datetime
import uuid

unique_id = str(uuid.uuid4())


# Create DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = 'health-productivity-db'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    body = json.loads(event['body'])

    try:
        response = table.put_item(
            Item={
                'logId': unique_id,
                'log': body['productivity'],
                'feedback': body['feedback'],
                'userId': body['userId'],
                'blocker': body['blockers'],
                'createdAt': datetime.utcnow().isoformat()
            }
        )

        return {
            'statusCode': 200,
            'headers': {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",  # or specific origin like "http://localhost:5173"
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
                },
            'body': json.dumps({
                'message': 'Data written to DynamoDB!',
                'status': 'true'
            })
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
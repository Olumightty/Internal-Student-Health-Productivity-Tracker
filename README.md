# Neo-Cloud Student Health & Productivity Tracker

A comprehensive, secure, and private productivity tracking platform designed specifically for Neo-Cloud students to monitor their daily learning progress, provide class feedback, and identify blockers in their cloud computing journey.

## 🎯 Project Overview

The **Neo-Cloud Student Health & Productivity Tracker** is an internal web application that enables authenticated students to:

- **📝 Log Daily Progress**: Record learning achievements and productivity metrics
- **💬 Provide Class Feedback**: Share insights and suggestions about course content
- **🚧 Report Blockers**: Identify and communicate challenges or obstacles
- **📊 View Historical Data**: Access past entries and track learning patterns over time
- **🔐 Secure Authentication**: Private, user-specific data with robust access controls

## 🏗️ Architecture Overview

### Infrastructure Components

- **AWS Cognito**: User authentication and authorization
- **API Gateway**: RESTful backend endpoints
- **AWS Lambda**: Serverless compute for data processing
- **DynamoDB**: NoSQL database for storing user logs
- **S3 + CloudFront**: Static website hosting and CDN
- **IAM**: Fine-grained access control and security roles
- **CloudWatch**: Monitoring, logging, and error tracking

### Architecture Diagram
```
┌─────────────────┐
│   CloudFront    │  ← CDN for performance
└─────────────────┘
         │
         ▼
┌─────────────────┐
│       S3        │  ← Static site hosting (Frontend app)
└─────────────────┘
         │
         ▼
┌─────────────────┐       ┌─────────────────┐
│    Cognito      │◄────►│    API Gateway   │
│   (Auth User)   │       │ (REST endpoint) │
└─────────────────┘       └─────────────────┘
                                │
                   Cognito Authorizer attached
                                ▼
                         ┌──────────────┐
                         │   Lambda     │
                         │ (Business    │
                         │  Logic)      │
                         └──────────────┘
                                │
                                ▼
                         ┌──────────────┐
                         │  DynamoDB    │
                         └──────────────┘

Monitoring and Permissions:
┌─────────────────┐     ┌──────────────┐
│  CloudWatch     │     │     IAM      │
│ (Logs, Metrics) │     │ (Permissions)│
└─────────────────┘     └──────────────┘
```

## 📁 Project Structure

```
team-tracker/
├── backend/                  # Backend Lambda functions
│   ├── addlog.py            # POST Lambda handler
|   ├── getlog.py            # GET Lambda handler
├── frontend/                # React frontend application
├── terraform/               # Infrastructure as Code
│   ├── variables.tf         # Variable definitions
│   ├── cognito.tf           # Cognito user pool and client
│   ├── dynamodb.tf          # DynamoDB table configuration
│   ├── gateway.tf           # API Gateway configuration
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- **AWS CLI** configured with appropriate permissions
- **Terraform** v1.0+ installed
- **Node.js** v16+ and npm
- **Python** 3.9+ (for Lambda functions)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd team-tracker
   ```

2. **Configure AWS credentials**
   ```bash
   aws configure
   ```

3. **Deploy infrastructure**
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```

4. **Build and deploy frontend**
   ```bash
   cd ../frontend
   npm install
   npm run build
   aws s3 sync dist/ s3://your-bucket-name
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=https://your-api-gateway-url
REACT_APP_COGNITO_USER_POOL_ID=your-user-pool-id
REACT_APP_COGNITO_CLIENT_ID=your-client-id
REACT_APP_AWS_REGION=us-east-1
```

### Terraform Variables

Configure `terraform/variables.tf` add your own values:

```hcl
table_name     = ""
accountID    = ""
region       = "us-east-1"
api_name      = ""
```

## 🛠️ Development

### Frontend Development

```bash
cd frontend
npm install
npm start          # Start development server
npm test           # Run tests
npm run build      # Build for production
```

### Local Testing

```bash
# Run frontend locally
cd frontend && npm start

# Test Lambda functions locally
cd backend && python lambda.py
```

## 🔐 Security Features

- **Multi-factor Authentication** via AWS Cognito
- **JWT Token-based** session management
- **HTTPS/TLS** encryption for all communications
- **CORS** properly configured
- **Input Validation** and sanitization

## 📊 API Endpoints

### User Data
- `GET /logs` - Retrieve user's log entries
- `POST /logs` - Create new log entry
- `PUT /logs/{id}` - Update existing log entry
- `DELETE /logs/{id}` - Delete log entry

### Manual Deployment

1. **Infrastructure**: `cd terraform && terraform apply`
3. **Frontend**: Build and sync to S3

## 📈 Monitoring

- **CloudWatch Dashboards** for application metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


**Built with ❤️ by the Ayoola Olumide & Busolami Oreoluwa**

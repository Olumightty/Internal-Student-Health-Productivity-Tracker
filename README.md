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
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   CloudFront    │    │     S3       │    │    Cognito      │
│   (CDN)         │◄──►│  (Frontend)  │◄──►│  (Auth)         │
└─────────────────┘    └──────────────┘    └─────────────────┘
         │                                           │
         ▼                                           ▼
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│  API Gateway    │◄──►│   Lambda     │◄──►│   DynamoDB      │
│  (REST API)     │    │ (Functions)  │    │   (Database)    │
└─────────────────┘    └──────────────┘    └─────────────────┘
         │                     │
         ▼                     ▼
┌─────────────────┐    ┌──────────────┐
│   CloudWatch    │    │     IAM      │
│  (Monitoring)   │    │   (Roles)    │
└─────────────────┘    └──────────────┘
```

## 📁 Project Structure

```
team-tracker/
├── backend/                    # Backend Lambda functions
│   ├── lambda.py              # Main Lambda handler
│   ├── requirements.txt       # Python dependencies
│   └── utils/                 # Utility functions
│       ├── auth.py           # Authentication helpers
│       ├── database.py       # DynamoDB operations
│       └── validators.py     # Input validation
├── frontend/                   # React frontend application
│   ├── public/               # Static assets
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── SignUpForm.jsx
│   │   │   ├── SignInForm.jsx
│   │   │   ├── DailyLogForm.jsx
│   │   │   └── PreviousEntriesTable.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Frontend utilities
│   │   └── App.jsx          # Main application component
│   ├── package.json         # Node.js dependencies
│   └── tailwind.config.js   # Tailwind CSS configuration
├── terraform/                 # Infrastructure as Code
│   ├── main.tf              # Main Terraform configuration
│   ├── variables.tf         # Variable definitions
│   ├── outputs.tf           # Output values
│   ├── cognito.tf           # Cognito user pool and client
│   ├── dynamodb.tf          # DynamoDB table configuration
│   ├── lambda.tf            # Lambda function resources
│   ├── api-gateway.tf       # API Gateway configuration
│   ├── s3.tf                # S3 bucket and CloudFront
│   ├── iam.tf               # IAM roles and policies
│   └── cloudwatch.tf        # Monitoring and logging
├── docs/                     # Documentation
│   ├── API.md               # API documentation
│   ├── DEPLOYMENT.md        # Deployment guide
│   └── ARCHITECTURE.md      # Detailed architecture docs
├── scripts/                  # Deployment and utility scripts
│   ├── deploy.sh            # Deployment script
│   ├── build.sh             # Build script
│   └── test.sh              # Testing script
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

5. **Deploy backend functions**
   ```bash
   cd ../backend
   zip -r lambda-function.zip .
   aws lambda update-function-code --function-name student-tracker --zip-file fileb://lambda-function.zip
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

Configure `terraform/terraform.tfvars`:

```hcl
project_name     = "neo-cloud-tracker"
environment      = "production"
aws_region       = "us-east-1"
domain_name      = "tracker.neo-cloud.com"
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

### Backend Development

```bash
cd backend
pip install -r requirements.txt
python -m pytest tests/     # Run tests
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
- **Row-level Security** in DynamoDB
- **HTTPS/TLS** encryption for all communications
- **CORS** properly configured
- **Input Validation** and sanitization
- **Rate Limiting** on API endpoints

## 📊 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/signout` - User logout
- `POST /auth/refresh` - Refresh JWT token

### User Data
- `GET /logs` - Retrieve user's log entries
- `POST /logs` - Create new log entry
- `PUT /logs/{id}` - Update existing log entry
- `DELETE /logs/{id}` - Delete log entry

### Health Check
- `GET /health` - API health status

## 🚀 Deployment

### Automated Deployment

```bash
# Deploy everything
./scripts/deploy.sh

# Deploy only infrastructure
./scripts/deploy.sh --infra-only

# Deploy only application
./scripts/deploy.sh --app-only
```

### Manual Deployment

1. **Infrastructure**: `cd terraform && terraform apply`
2. **Backend**: Deploy Lambda functions via AWS CLI
3. **Frontend**: Build and sync to S3

## 📈 Monitoring

- **CloudWatch Dashboards** for application metrics
- **Error Tracking** and alerting
- **Performance Monitoring** for API response times
- **User Analytics** and usage patterns
- **Cost Monitoring** and optimization

## 🧪 Testing

### Unit Tests
```bash
cd frontend && npm test
cd backend && python -m pytest
```

### Integration Tests
```bash
./scripts/test.sh --integration
```

### End-to-End Tests
```bash
./scripts/test.sh --e2e
```

## 📚 Documentation

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Architecture Details](docs/ARCHITECTURE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: support@neo-cloud.com
- **Slack**: #student-tracker
- **Issues**: GitHub Issues tab

## 🔄 Changelog

### v1.0.0 (2025-06-10)
- Initial release
- Basic authentication and logging features
- Responsive React frontend
- AWS serverless backend
- Terraform infrastructure

---

**Built with ❤️ by the Neo-Cloud Team**
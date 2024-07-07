# Insurance Policy Management API

A RESTful API service for managing insurance policies, built with NestJS and TypeScript.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)\
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, read, update, and delete insurance policies
- Basic authentication with AWS Cognito
- Middleware for logging and error handling
- Mock database connection with PostgreSQL

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v20.x or later)
- npm (v10.x or later)
- PostgreSQL (local or AWS RDS instance)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/carloscrono/insurance-policy-api.git
cd insurance-policy-api

```

2. Install Dependencies:

```bash
npm install

```

## Environment Configuration

1.  Create a .env file in the root directory of the project:

```bash
touch .env

```

2. Add the following environment variables to the .env file:

```env
DATABASE_HOSTNAME=your_database_host
DATABASE_PORT=5432
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=your_database_name
COGNITO_USER_POOL_ID=your_cognito_user_pool_id
COGNITO_CLIENT_ID=your_cognito_client_id
COGNITO_REGION=your_cognito_region

```

3. Replace the placeholder values with your actual database and AWS Cognito configuration.

## Running the Application

1. Start the PostgreSQL database server.

2. Run the application:

```bash
npm run start

```

3. The application should now be running at http://localhost:3000.

## API Endpoints

### Authentication

- POST /auth/login: Authenticate a user and retrieve a JWT token.

### Policies

- GET /policy: Retrieve all policies (protected endpoint).
- GET /policy/:id Retrieve a specific policy by ID.
- POST /policy: Create a new policy.
- PUT /policy/:id Update a policy by ID.
- DELETE /policy/:id Delete a policy by ID.

### Example Requests

#### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'

```

##### Use the access_token generated accessToken.jwtToken:

```json
"accessToken": {
        "jwtToken": "eyJraWQiOiJrbGM1OStUczFIc2VaYzdxR3NDaFwvK1FZOFJDTVh2UlNjNTBnbEFrXC80SEk9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJlNDA4ZTQ4OC0xMGIxLTcwZDgtOTEwYi01YjBiZTU5NTJhYjQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV82V0NDcHpRd3IiLCJjbGllbnRfaWQiOiI2ZDVicjAyYTIzdHZvZjZtaTZydW5tamxuNSIsIm9yaWdpbl9qdGkiOiIxYjY0NjgzMi01ZjRlLTRiNjEtYWU4OC05YTdlMzg4M2I5NjEiLCJldmVudF9pZCI6IjBhYTI3MDM3LTE3OTEtNDNkMS04MjYwLTY4YjFiMzQwNTFjYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MjAzMDY5MzYsImV4cCI6MTcyMDMxMDUzNiwiaWF0IjoxNzIwMzA2OTM2LCJqdGkiOiI2ZDhiYjVmMC05OTFjLTQ5MDYtOWViMi1kZDY3Y2NjZTBmMGEiLCJ1c2VybmFtZSI6ImNhcmxvc21hcnRpbmV6In0.Pu2D2lNyxbcuepgdqFy2e4pnc2hsgu7SIPBjIMkNUU4-KGYVlDsjHXMEoj3I_eokzUaOVTdk5eGuMo1YQtZF4lmBN4pmWWgTnYftj3uiqldwohB6Zm1af6Yzab_bspZtyLdNfFDHT3owz2JxDrAYQWLGxWPmSlzMPCLVyfi9DoRaOdngOC_qc-jFuKKgx2Jiua8FvLIIwsrnpNY2fZJjatxnVpr0fixByGBDuZG8mvllYfSUY8n3Iy56UAKrCN24E6xPts16nRV2CQTziO8LrB4Y_caVbzEz9slgdn-IXyo_O88ASUVRkL07yzteCA5EZ6A9vO_8riSCE0xUCty1CQ",
        "payload": {
            "sub": "e408e488-10b1-70d8-910b-5b0be5952ab4",
            "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_6WCCpzQwr",
            "client_id": "6d5br02a23tvof6mi6runmjln5",
            "origin_jti": "1b646832-5f4e-4b61-ae88-9a7e3883b961",
            "event_id": "0aa27037-1791-43d1-8260-68b1b34051ca",
            "token_use": "access",
            "scope": "aws.cognito.signin.user.admin",
            "auth_time": 1720306936,
            "exp": 1720310536,
            "iat": 1720306936,
            "jti": "6d8bb5f0-991c-4906-9eb2-dd67ccce0f0a",
            "username": "carlosmartinez"
        }
    }

```

#### Get All Policies

```bash
curl -X GET http://localhost:3000/policy \
  -H 'Authorization: Bearer <your_jwt_token>'

```

### Postman Testing

To test the API endpoints using Postman, follow these steps:

- Open Postman and create a new request.
- Authenticate and Get JWT Token:
- Set the request type to POST.
- Enter the URL: http://localhost:3000/auth/login.
- Go to the Body tab, select raw, and set the type to JSON.
- Enter your username and password in the JSON format:

```json
{
  "username": "testing",
  "password": "T3sting#"
}
```

##### Click Send.

- Copy the JWT token from the response.

#### Test Protected Endpoints:

- Create a new request.
- Set the request type to GET.
- Enter the URL: http://localhost:3000/policy.
- Go to the Headers tab.
- Add a new header:
- Key: Authorization
- Value: Bearer <your_jwt_token> (replace <your_jwt_token> with the token you copied earlier).

##### Click Send.

## Middleware

- Logging: Logs all incoming requests along with the method, URL, status code, and response time.

- Error Handling: Handles all errors, logs them, and returns a JSON response with the error details.

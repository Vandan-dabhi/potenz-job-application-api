# Potenz Job Application API

Backend API for a simple job application system built with Node.js, Express.js and MongoDB.

## Tech Stack

Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Multer and ImageKit.

## Features

- Candidate registration and login
- JWT based authentication
- Get available jobs
- Get job details
- Apply for a job
- Upload resume
- Add an optional cover letter
- View submitted applications
- Track application status

## Setup

Install the dependencies:

    npm install

Create a `.env` file in the project root with:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

Start the project in development:

    npm run dev

For production:

    npm start

The server runs on `http://localhost:5000`.

## API Endpoints

### Authentication

**Register**

`POST /api/auth/register`

Example request:

    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "123456"
    }

**Login**

`POST /api/auth/login`

Example request:

    {
      "email": "john@example.com",
      "password": "123456"
    }

Login creates an HTTP-only JWT cookie.

### Jobs

**Get all jobs**

`GET /api/jobs`

**Get job by ID**

`GET /api/jobs/:id`

### Applications

**Apply for a job**

`POST /api/jobs/:jobId/apply`

Authentication is required.

Request type: `multipart/form-data`

- `resume` - PDF file, required
- `coverLetter` - text, optional

Resume size is limited to 2 MB.

**My applications**

`GET /api/applications/my`

Authentication is required.

Returns the applications submitted by the logged-in candidate.

## Application Status

A new application starts with the status `applied`.

Possible statuses:

- applied
- reviewed
- selected
- rejected

## Resume Upload

Resumes are uploaded using Multer and stored on ImageKit. The ImageKit URL is saved with the application.

Only PDF files up to 2 MB are accepted.

## Postman

The Postman collection is included with the project and contains all the API endpoints required for testing.

Basic testing flow:

Register → Login → Get Jobs → Apply for Job → My Applications

## Environment File

`.env.example` is included as a reference for the required environment variables.

The actual `.env` file is not included in the repository.

## Testing

The APIs were tested using Postman.

The following cases were tested:

- Register with valid details
- Register with missing fields
- Register with an existing email
- Login with valid credentials
- Login with incorrect credentials
- Get all jobs
- Get job by ID
- Apply for a job with a PDF resume
- Apply without a resume
- Apply for the same job twice
- View my applications
- Upload a non-PDF resume
- Upload a resume larger than 2 MB
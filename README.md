# Express TypeScript RESTful Jobs API

A modern, secure RESTful API built with TypeScript and Express.js for comprehensive job management. This robust backend solution provides complete CRUD operations for job positions and secure user authentication. Designed for job posting platforms, recruitment systems, and career management applications with scalability and type safety at its core.

<div align="center">

<img src="./assets/demo.gif" alt="App Demo">

</div>


## Tech Stack

- <img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=TypeScript&logoColor=white&style=flat" alt="TypeScript">
- <img src="https://img.shields.io/badge/-Node.js-339933?logo=Node.js&logoColor=white&style=flat" alt="Node.js">
- <img src="https://img.shields.io/badge/-Express.js-000000?logo=Express&logoColor=white&style=flat" alt="Express.js">

## Features

- **🔐 User Authentication**: Secure user registration and login with JWT tokens
- **📝 Job Management**: Complete CRUD operations for job positions
- **🔒 Protected Routes**: JWT-based authentication middleware for secure access
- **📊 Job Status Tracking**: Track job applications with status (pending, interview, declined)
- **🛡️ Security Features**: 
  - Rate limiting (100 requests per 15 minutes)
  - CORS protection
  - Security headers with Helmet.js
  - Password hashing with bcrypt
- **📚 API Documentation**: Interactive Swagger/OpenAPI documentation
- **✅ Input Validation**: Comprehensive request validation and error handling
- **🗄️ MongoDB Integration**: Mongoose ODM with schema validation
- **⚡ TypeScript**: Full type safety and enhanced developer experience
- **🌐 Cloud Ready**: Configured for production deployment


## Run Locally

Clone the project

```bash
  git clone https://github.com/yourusername/ts-express-jobs-api.git
```

Go to the project directory

```bash
  cd .\ts-express-jobs-api
```

Open with VSCode

```bash
  code .
```

Install dependencies

```bash
  npm install
```

Create environment variables file

```bash
  cp .env.example .env
```

Configure your `.env` file with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the development server

```bash
  npm run dev
```

The API will be available at `http://localhost:3000`

> **Try the live production server**: You can test the API endpoints directly at [https://ts-express-jobs-api.onrender.com/api](https://ts-express-jobs-api.onrender.com/api)

## API Documentation
You can view the API documentation [here](https://ts-express-jobs-api.onrender.com/api-docs/).

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── database.ts       # MongoDB connection configuration
│   │   └── swagger.ts        # Swagger/OpenAPI documentation setup
│   ├── controllers/
│   │   ├── authController.ts # Authentication logic (register, login)
│   │   └── jobsController.ts # Job CRUD operations
│   ├── errors/
│   │   └── CustomAPIError.ts # Custom error class for API responses
│   ├── middleware/
│   │   ├── authenticate-user.ts  # JWT authentication middleware
│   │   ├── error-handler.ts      # Global error handling middleware
│   │   ├── not-found.ts          # 404 error handler
│   │   └── rate-limiter.ts       # Rate limiting configuration
│   ├── models/
│   │   ├── Job.ts            # Job schema and model
│   │   └── User.ts           # User schema and model
│   ├── routes/
│   │   ├── auth.ts           # Authentication routes
│   │   └── jobs.ts           # Job management routes
│   └── index.ts              # Application entry point and server setup
├── types/
│   └── express.d.ts          # TypeScript type extensions
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── swagger.yaml              # API documentation specification
```


## Contributing

I welcome contributions to this project! Feel free to submit pull requests and suggest improvements. 
If you have any questions or need assistance, don’t hesitate to contact me at adhamelrouby@aucegypt.edu.
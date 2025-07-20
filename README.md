# Authentication Project

A full-stack authentication application built with React (frontend) and Node.js/Express (backend) featuring user registration, login, email verification, password reset, and Google OAuth integration.

## 🚀 Features

- **User Registration & Login** - Secure user authentication with JWT tokens
- **Email Verification** - Email confirmation for new user accounts
- **Password Reset** - Forgot password functionality with email-based reset
- **Google OAuth** - Sign in with Google integration
- **Protected Routes** - Frontend route protection for authenticated users
- **MongoDB Integration** - User data persistence with MongoDB

## 🏗️ Tech Stack

### Frontend
- **React** (v17.0.2)
- **React Router DOM** (v5.2.0) - Client-side routing
- **Axios** (v0.21.1) - HTTP client
- **Google OAuth** - Social authentication

### Backend
- **Node.js** with **Express** (v4.17.1)
- **MongoDB** (v3.6.5) - Database
- **JWT** (jsonwebtoken) - Authentication tokens
- **bcrypt** - Password hashing
- **Nodemailer** - Email sending
- **Google APIs** - OAuth integration
- **Babel** - ES6+ transpilation

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher, tested with v22.16.0)
- **npm** (v6 or higher)
- **MongoDB** (running locally on port 27017)

> **Note**: If you encounter PostCSS build errors with newer Node.js versions, the project dependencies have been updated to support modern Node.js versions.

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd authentication-project
```

### 2. Backend Setup

```bash
cd back-end
npm install
```

**Environment Configuration:**

Create a `.env` file in the `back-end` directory. You can use the provided template:

```bash
cp .env.example .env
```

Then edit the `.env` file with your actual values:

```env
# JWT Secret Key
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (for password reset and verification emails)
EMAIL_SECRET=your-email@gmail.com
PASSWORD_SECRET=your-email-app-password

# Google OAuth Configuration (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Server Port (optional, defaults to 8080)
PORT=8080
```

> **⚠️ Important**: The `.env` file contains sensitive information and is not included in version control. Each developer must create their own `.env` file using the `.env.example` template.

### 3. Frontend Setup

```bash
cd ../front-end
npm install
```

### 4. Database Setup

Ensure MongoDB is running locally on port 27017. The application will automatically connect to `mongodb://localhost:27017`.

## 🚀 Running the Application

### Start the Backend Server
```bash
cd back-end
npm run dev
```
The backend server will start on `http://localhost:8080`

### Start the Frontend Application
```bash
cd front-end
npm start
```
The frontend application will start on `http://localhost:3000`


```
authentication-project/
├── back-end/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── sendMail.js          # Email sending controller
│   │   ├── routes/
│   │   │   ├── ForgotPassRoute.js   # Password reset route
│   │   │   ├── GetGoogleOAuthRoute.js
│   │   │   ├── googleOauthCallbackRoute.js
│   │   │   ├── LoginRoute.js        # User login route
│   │   │   ├── ResetPasswordRoute.js
│   │   │   ├── SignUpRoute.js       # User registration route
│   │   │   ├── UpdateUserRoute.js   # User profile update
│   │   │   ├── VerifyEmail.js       # Email verification route
│   │   │   └── index.js             # Route aggregator
│   │   ├── utils/
│   │   │   ├── getGoogleOAuth.js    # Google OAuth utilities
│   │   │   ├── getGoogleUser.js
│   │   │   ├── oAuthClient.js
│   │   │   └── updateOrCreateUserFromOauth.js
│   │   ├── db.js                    # Database connection
│   │   └── server.js                # Express server setup
│   └── package.json
├── front-end/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── PrivateRoute.js      # Protected route component
│   │   │   ├── useToken.js          # Token management hook
│   │   │   └── useUser.js           # User state management hook
│   │   ├── pages/
│   │   │   ├── EmailVerificationLandingPage.js
│   │   │   ├── ErrVerification.js
│   │   │   ├── ForgotPassword.js
│   │   │   ├── LoginPage.js
│   │   │   ├── PleaseVerifyEmail.js
│   │   │   ├── ResetPasswordLandingPage.js
│   │   │   ├── ResetSuccessPage.js
│   │   │   ├── SignupPage.js
│   │   │   ├── SuccVerification.js
│   │   │   └── UserInfoPage.js
│   │   ├── util/
│   │   │   └── useQueryParams.js    # URL query parameter utility
│   │   ├── App.js                   # Main App component
│   │   ├── Routes.js                # Application routes
│   │   └── index.js                 # React entry point
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Email Setup (Required for email verification and password reset)
1. Use Gmail with App Password (recommended)
2. Enable 2-Factor Authentication on your Google account
3. Generate an App Password for this application
4. Add your email and app password to the `.env` file

### Google OAuth Setup (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Add client ID and secret to `.env` file

## 🛠️ Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon and babel
- `npm test` - Run tests (not implemented)

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🔐 API Endpoints

- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `POST /api/forgot-password` - Request password reset
- `POST /api/users/:userId/reset-password` - Reset password
- `PUT /api/users/:userId` - Update user information
- `PUT /api/users/:userId/verify-email` - Verify email address
- `GET /auth/google/url` - Get Google OAuth URL
- `GET /auth/google/callback` - Google OAuth callback

## 🚨 Common Issues

### Node.js Compatibility Issues
- **PostCSS/Build Errors**: If you encounter `ERR_PACKAGE_PATH_NOT_EXPORTED` errors, run:
  ```bash
  cd front-end
  npm install react-scripts@latest
  ```
- **Recommended Node.js version**: v16+ (tested with v22.16.0)

### MongoDB Connection Issues
- Ensure MongoDB is running: `brew services start mongodb-community` (macOS)
- Check if MongoDB is accessible on `localhost:27017`

### Email Not Sending
- Verify email credentials in `.env` file
- Check if Gmail App Password is correctly generated
- Ensure Gmail account has 2FA enabled

### Google OAuth Issues
- Verify Google Client ID and Secret
- Check authorized redirect URIs in Google Cloud Console
- Ensure Google+ API is enabled

### Missing `.env` File
- Copy `.env.example` to `.env` in the `back-end` directory
- Fill in your actual credentials (never commit the `.env` file to version control)

## 📝 Environment Variables Reference

```env
JWT_SECRET=your-jwt-secret-key
EMAIL_SECRET=your-email@gmail.com
PASSWORD_SECRET=your-gmail-app-password
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PORT=8080
```

## 📄 License

This project is licensed under the ISC License.

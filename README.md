# P-fi

## Overview

P-fi is a web application designed to facilitate the management of invoices and investments for lenders and borrowers. It provides a dashboard for lenders to invest their money at their own interest and broowers can lend money. It provides a user-friendly interface for uploading, viewing, and managing invoices, along with wallet system for payments.

## Features

- User registration and login with smtp setup
- Role-based access for Admin, Lender, and Borrower
- Upload and manage invoices and investments
- View and manage lender and borrower details
- Admin dashboard for managing users and invoices
- Razorpay for money transfers
- A wallet system for lenders and borrowers
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **File Storage**: Cloudinary for file uploads
- **Authentication**: Cookie-based session management
- **API Documentation**: Swagger

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account for file storage

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd invoice_mng
   ```

2. Install dependencies for the client:

   ```bash
   cd client
   npm install
   ```

3. Install dependencies for the server:

   ```bash
   cd server
   npm install
   ```

4. Create a `.env` file in the `server` directory and add your environment variables:

   ```plaintext
   MONGODB_URI=<your_mongodb_uri>
   SESSION_SECRET=<session_secret>
   EMAIL_USER=<your_email_id>
   EMAIL_PASS=<your_app_password>
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   RAZORPAY_API_KEY=<your_razorpay_api_key>
   RAZORPAY_API_SECRET=<your_razorpay_api_secret>
   ```

### Running the Application

0. Changes for local testing
 
 - Comment out the env file in the client folder. 
 - In server folder server.js comment out sameSite in cookieSession method and reverse httpOnly and secure to false.

1. Start the server:

   ```bash
   cd server
   npm run dev
   ```

2. Start the client:

   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note**: This is a one-way operation. Once you `eject`, you can't go back!

## API Documentation

API endpoints are documented using Swagger. You can access the documentation at `http://localhost:5001/api-docs` after starting the server.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app) for bootstrapping the frontend.
- [Express](https://expressjs.com/) for the backend framework.
- [MongoDB](https://www.mongodb.com/) for the database.
- [Cloudinary](https://cloudinary.com/) for file storage.
- [Razorpay](https://razorpay.com/) for payment processing.


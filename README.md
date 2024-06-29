# Hamro Yatra - Travel Management System

Hamro Yatra is a comprehensive travel management system designed to facilitate booking and management of travel packages, providing users with a seamless experience in exploring and booking travel options.

## Features

- **User Authentication:** Secure registration and login using Passport.js with local strategy.
- **Travel Package Listings:** Display of various travel packages with details.
- **Booking Management:** Allow users to book travel packages and manage bookings.
- **Admin Dashboard:** Admin panel for managing users, bookings, and travel packages.
- **Content Management:** Admin capability to update travel package details and manage content.
- **Image Uploads:** Integration with Cloudinary for storing and managing images.

## Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- EJS (Embedded JavaScript) for views
- Passport.js for authentication
- Cloudinary for image storage
- Other dependencies as listed in `package.json`

## Installation and Setup

### Prerequisites

- Node.js installed on your machine
- MongoDB installed locally or access to a MongoDB database

### Download and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/hamro-yatra.git
   cd hamro-yatra

### Install dependencies
npm install

### Set up environment variables

PORT=8081
ATLAS_URL=your_atlas_mongodb_url
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret


### Run the application
npm start


### Access the application:
Open your web browser and navigate to http://localhost:3000 (or the configured port).


### Usage
Register as a new user or log in with existing credentials.
Explore available travel packages, view details, and make bookings.
user can log in to access the their profile page for managing  travel packages.

### Contributing
Contributions are welcome! Please fork the repository and submit pull requests to contribute.



Replace placeholders (`yourusername`, `your_atlas_mongodb_url`, `your_session_secret`, `your_cloudinary_cloud_name`, `your_cloudinary_api_key`, `your_cloudinary_api_secret`) with your actual values. This `README.md` file now provides comprehensive documentation for setting up and using the "Hamro Yatra" travel management system. Adjust details and sections as per your project's specific requirements and configurations.

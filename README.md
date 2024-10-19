# Room Booking and Management System

The Room Booking and Management System is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Next.js for the front-end. The system allows users to browse available rooms, book them, and view their booking history. It also provides an admin panel for room and booking management.

## Features

### Frontend (Next.js)

- **Home Page**:

  - Displays a list of rooms (at least 3) with title, rent, and facilities.
  - "View Details" button for each room, linking to the Room Detail Page.

- **Room Detail Page**:

  - Displays detailed information about the room, including title, rent, facilities, and picture.
  - Provides a "Confirm Booking" functionality with a submit button.
  - Validates bookings to prevent double booking for already-booked dates.

- **User Dashboard**:

  - Shows the user's booking history, including room details and booked dates.

- **Admin Dashboard**:
  - Admins can create, update, and delete rooms.
  - View, modify, or cancel bookings.
  - Upload images for rooms.

### Backend (Node.js + Express)

- **Authentication**:

  - Implements JWT-based authentication for users and admins.
  - Role-based access control for protecting admin routes.

- **Room Management API**:

  - Create, update, and delete room entries.
  - Store room details (title, rent, facilities) and upload room images.

- **Booking API**:
  - Allows booking a room with date conflict validation.
  - Enables modifying or canceling bookings.

### Database (MongoDB + Mongoose)

- **Rooms Collection**:

  - Schema includes title, rent, facilities (array of strings), and picture.

- **Bookings Collection**:

  - Stores user ID, room ID, and booking dates.

- **Users Collection**:
  - Stores name, email, password, and roles (user/admin).

## Technologies Used

- **Frontend**: Next.js, React, CSS framework (e.g., Tailwind CSS)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT for secure authentication and role-based access
- **File Storage**: Cloud storage Cloudinary for room images
<!-- - **Optional (Real-Time Updates)**: Socket.io for real-time booking status updates -->

## Setup and Installation

Create a .env file in the root

NODE_ENV="development"
PORT=8000
DATABASE_URL=mongodb+srv://
BCRYPT_SALT_ROUNDS=13
JWT_SECRET=SECRET
JWT_REFRESH_SECRET=SECRET

## Start the Backend Server

cd server
npm install
npm run dev

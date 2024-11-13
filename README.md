# Vidly Movie Rental App

This is a Node.js-based web application for managing a movie rental service, following the tutorial series by [Mosh Hamedani](https://codewithmosh.com/). The Vidly app allows users to manage movies, customers, and rentals, as well as view movie genres. It is designed to demonstrate best practices for building backend services using Node.js, Express, and MongoDB.

## Features

- **Manage Movies**: CRUD operations for movies and genres
- **Manage Customers**: Add and update customer information
- **Rentals**: Handle movie rentals and return processing
- **Authentication and Authorization**: User registration, login, and role-based access
- **Validation and Error Handling**: Uses Joi for validation and custom error handling middleware
- **MongoDB**: Mongoose for data modeling and interactions with MongoDB

## Demo

This project has no live demo is available. However, you can set it up locally by following the instructions below.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [License](#license)

## Technologies

- Node.js
- Express.js
- MongoDB & Mongoose
- Joi (for validation)
- JWT (for authentication)
- Lodash (for utility functions)
- Config (for managing configuration)

## Setup

To run this project locally, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **MongoDB** installed locally or a MongoDB Atlas account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/vidly.git
   cd vidly
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (see below for details)

4. **Run the app**:
   ```bash
   npm start
   ```

The server should now be running at `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
VIDLY_JWT_PRIVATE_KEY=your_jwt_private_key
MONGO_URI=your_mongodb_uri
```

* `VIDLY_JWT_PRIVATE_KEY`: A key for signing JWT tokens (required for authentication)
* `MONGO_URI`: MongoDB connection string (for connecting to a local or Atlas database)

## Project Structure

Here's an overview of the main folders and files in this project:

```
vidly/
├── models/     # Data models (e.g., Movie, Genre, Customer, Rental, User)
├── routes/     # Route handlers for each resource (movies, genres, rentals, users, auth)
├── middleware/ # Custom middleware (authentication, error handling)
├── startup/    # Setup scripts (e.g., logging, routes, database connection)
├── config/     # Configuration files
├── .env        # Environment variables (not included in the repository)
├── index.js    # Main entry point
└── package.json # Project metadata and dependencies
```

## Endpoints

Here is a brief overview of the main endpoints:

### Auth
* **POST** `/api/auth` - Log in a user and return a JWT

### Users
* **POST** `/api/users` - Register a new user
* **GET** `/api/users/me` - Get the logged-in user's details

### Movies
* **GET** `/api/movies` - Get all movies
* **POST** `/api/movies` - Add a new movie
* **PUT** `/api/movies/:id` - Update a movie by ID
* **DELETE** `/api/movies/:id` - Delete a movie by ID

### Rentals
* **GET** `/api/rentals` - Get all rentals
* **POST** `/api/rentals` - Add a new rental

### Genres
* **GET** `/api/genres` - Get all genres
* **POST** `/api/genres` - Add a new genre

### Customers
* **GET** `/api/customers` - Get all customers
* **POST** `/api/customers` - Add a new customer

## License

This project is licensed under the MIT License.

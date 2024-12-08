Random User API Batch Processing and Pagination

A scalable backend system built with Node.js, Express.js, and MongoDB, designed to fetch, process, and store 5000 random user profiles in batches. The system includes configurable parameters, background task scheduling, and a robust API for querying stored user data with pagination and dynamic search capabilities.

Features
Batch Processing: Fetches 5000 random user profiles using the Random User API in batches.
Configurable Settings: Adjust batch size, requests per second, sleep time, and API details via environment variables.
Background Task Scheduling: Automatically schedules and executes data fetching tasks with rate limiting.
Pagination API: Retrieve user data with pagination, sorting, and advanced search functionality.
Dynamic Search: Filter users by fields like name, email, age, gender, country, and more.
Scalable Architecture: Modular and maintainable code structure following best practices.

Your Requirements vs Code Implementation
Fetch 5000 Results Using the API

The code uses the Random User API and fetches the required 5000 results in batches of 300 users per batch.
Each batch uses 5 requests per second (batch.requestsPerSecond = 5).
After completing a batch, the system sleeps for 30 seconds (batch.sleepTime = 30000).
Code Reference:

src/services/fetchUsersService.js: Handles the batch fetching with appropriate sleep intervals.
Database Configurations

All configurations (sleep time, requests per second, batch size, etc.) are stored in the src/config/config.js file.
These values can be modified to suit different scenarios.
Code Reference:

src/config/config.js: Stores all configurable values.
Data Schema

The User schema matches the required format, including fields for id, gender, name, address, email, age, picture, and createdAt.
Nested objects (like address) are handled using a sub-schema.
Code Reference:

src/models/userModel.js: Defines the MongoDB schema.
Background Task with Queue and Batch Processing

A queue is implemented using a utility (sleep) to throttle API requests and avoid exceeding the API rate limits.
Each batch processes 300 records.
Code Reference:

src/utils/queue.js: Implements the sleep functionality.
src/services/fetchUsersService.js: Manages API requests and batch processing.
User API with Pagination, Sorting, and Search

A GET /api/users API is provided to fetch users from the database.
Query Parameters Supported:
limit: Number of results per page (default: 10).
page: Current page number (default: 1).
sort: Field to sort by (default: createdAt).
search: JSON object to filter users (supports fields like name, email, age, gender, etc.).
Code Reference:

src/controllers/userController.js: Implements the GET /api/users endpoint.
src/routes/userRoutes.js: Routes the API endpoint.
Folder Structure

The folder structure strictly adheres to modular coding practices:
Controllers for API logic.
Models for database schema.
Routes for API endpoints.
Services for background processing.
Utils for reusable utilities.
Code Reference:

Entire folder structure provided.
Unit Testing

Unit tests for service functions were not included in this response but can be provided upon request.
Bonus Features
Dynamic Configurations: The config.js file allows you to tweak all parameters without modifying the code.
Scalability: The queue-based batch processing ensures the system can handle API limits without crashing.
Search by Dynamic JSON: Flexible search capabilities for fields like name, email, age, and more.
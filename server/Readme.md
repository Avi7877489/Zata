## Authentication API Endpoints

### Register a New User
**POST** `/auth/register`

- **Description:** Registers a new user with name, email, and password.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }

  {
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "provider": "local"
  },
  "token": "JWT_TOKEN"
}


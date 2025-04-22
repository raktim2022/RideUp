# RideUp API Documentation

## User Endpoints

### Register User
**Endpoint:** `POST /users/register`

**Description:**  
Creates a new user account in the system.

**Request Body:**
```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "password": "string"
}
```

**Validation Rules:**
- `fullName.firstName`: Must be at least 3 characters
- `fullName.lastName`: Must be at least 3 characters
- `email`: Must be a valid email format
- `password`: Must be at least 8 characters

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 201         | User successfully created |
| 400         | Validation error |

**Success Response Example:**
```json
{
  "token": "jwt-token",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "user-id",
    "socketId": null
  }
}
```

**Error Response Example:**
```json
{
  "errors": [
    {
      "msg": "Email is not valid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Login User
**Endpoint:** `POST /users/login`

**Description:**  
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Validation Rules:**
- `email`: Must be a valid email format
- `password`: Must be at least 5 characters

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 200         | Login successful |
| 400         | Invalid credentials or validation error |

**Success Response Example:**
```json
{
  "token": "jwt-token",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "user-id",
    "socketId": null
  }
}
```

**Error Response Example:**
```json
{
  "error": "Invalid email or password"
}
```

**Validation Error Example:**
```json
{
  "errors": [
    {
      "msg": "Email is not valid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Get User Profile
**Endpoint:** `GET /users/profile`

**Description:**  
Retrieves the authenticated user's profile information.

**Authentication:**  
Requires a valid JWT token in the Authorization header.

**Request Body:**
None

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 200         | Success |
| 401         | Unauthorized - Invalid or missing token |

**Success Response Example:**
```json
{
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "user-id",
    "socketId": null
  }
}
```

**Error Response Example:**
```json
{
  "error": "Unauthorized - Please log in"
}
```

### Logout User
**Endpoint:** `GET /users/logout`

**Description:**  
Logs out the currently authenticated user.

**Authentication:**  
Requires a valid JWT token in the Authorization header.

**Request Body:**
None

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 200         | Logout successful |
| 401         | Unauthorized - Invalid or missing token |

**Success Response Example:**
```json
{
  "message": "Logged out successfully"
}
```

**Error Response Example:**
```json
{
  "error": "Unauthorized - Please log in"
}
```

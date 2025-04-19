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

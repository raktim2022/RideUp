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

## Captain Endpoints

### Register Captain
**Endpoint:** `POST /captains/register`

**Description:**  
Creates a new captain account in the system.

**Request Body:**
```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "vehicle": {
    "color": "string",
    "plateNumber": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

**Validation Rules:**
- `fullName.firstName`: Must be at least 2 characters
- `email`: Must be a valid email format
- `password`: Must be at least 5 characters
- `phoneNumber`: Must not be empty
- `vehicle.color`: Must not be empty
- `vehicle.plateNumber`: Must not be empty
- `vehicle.capacity`: Must not be empty
- `vehicle.vehicleType`: Must not be empty

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 201         | Captain successfully created |
| 400         | Validation error or captain already exists |

**Success Response Example:**
```json
{
  "token": "jwt-token",
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.driver@example.com",
    "_id": "captain-id",
    "vehicle": {
      "color": "Black",
      "plateNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "sedan"
    }
  }
}
```

**Error Response Example:**
```json
{
  "errors": [
    {
      "msg": "Email is invalid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Captain Already Exists Error:**
```json
{
  "message": "Captain already exist"
}
```

### Login Captain
**Endpoint:** `POST /captains/login`

**Description:**  
Authenticates a captain and returns a JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Validation Rules:**
- `email`: Must be a valid email format
- `password`: Must not be empty

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 200         | Login successful |
| 400         | Invalid credentials or validation error |

**Success Response Example:**
```json
{
  "token": "jwt-token",
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.driver@example.com",
    "_id": "captain-id",
    "vehicle": {
      "color": "Black",
      "plateNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "sedan"
    }
  }
}
```

**Error Response Example:**
```json
{
  "message": "Invalid email or password"
}
```

**Validation Error Example:**
```json
{
  "errors": [
    {
      "msg": "Email is invalid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Get Captain Profile
**Endpoint:** `GET /captains/profile`

**Description:**  
Retrieves the authenticated captain's profile information.

**Authentication:**  
Requires a valid JWT token in the Authorization header.

**Request Body:**
None

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 200         | Success |
| 401         | Unauthorized - Invalid or missing token |
| 500         | Server error |

**Success Response Example:**
```json
{
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.driver@example.com",
    "_id": "captain-id",
    "vehicle": {
      "color": "Black",
      "plateNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "sedan"
    }
  }
}
```

### Logout Captain
**Endpoint:** `GET /captains/logout`

**Description:**  
Logs out the authenticated captain.

**Authentication:**  
Requires a valid JWT token in the Authorization header.

**Request Body:**
None

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 200         | Logout successful |
| 401         | Unauthorized - Invalid or missing token |
| 500         | Server error |

**Success Response Example:**
```json
{
  "message": "Logged out successfully"
}
```

**Error Response Example:**
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

### Update Captain Profile
**Endpoint:** `PUT /captains/profile`

**Description:**  
Updates the authenticated captain's profile information.

**Authentication:**  
Requires a valid JWT token in the x-auth-token header.

**Request Body:**
```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "vehicle": {
    "color": "string",
    "plateNumber": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 200         | Profile updated successfully |
| 401         | Unauthorized - Invalid or missing token |
| 404         | Captain not found |

**Success Response Example:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Smith"
    },
    "email": "john.driver@example.com",
    "vehicle": {
      "color": "Blue",
      "plateNumber": "XYZ789",
      "capacity": 4,
      "vehicleType": "sedan"
    }
  }
}
```

### Update Captain Location
**Endpoint:** `PUT /captains/location`

**Description:**  
Updates the captain's current location coordinates.

**Authentication:**  
Requires a valid JWT token in the x-auth-token header.

**Request Body:**
```json
{
  "location": {
    "lat": "number",
    "lng": "number"
  }
}
```

**Validation Rules:**
- `location.lat`: Must be a number
- `location.lng`: Must be a number

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 200         | Location updated successfully |
| 400         | Validation error |
| 401         | Unauthorized - Invalid or missing token |
| 404         | Captain not found |

**Success Response Example:**
```json
{
  "success": true,
  "message": "Location updated successfully",
  "location": {
    "lat": 37.7749,
    "lng": -122.4194
  }
}
```

### Update Captain Status
**Endpoint:** `PUT /captains/status`

**Description:**  
Updates the captain's current availability status.

**Authentication:**  
Requires a valid JWT token in the x-auth-token header.

**Request Body:**
```json
{
  "status": "string"
}
```

**Validation Rules:**
- `status`: Must be one of: 'offline', 'online', 'busy'

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 200         | Status updated successfully |
| 400         | Validation error |
| 401         | Unauthorized - Invalid or missing token |
| 404         | Captain not found |

**Success Response Example:**
```json
{
  "success": true,
  "message": "Status updated successfully",
  "status": "busy"
}
```

### Update Captain Socket ID
**Endpoint:** `PUT /captains/socket`

**Description:**  
Updates the captain's socket ID for real-time communication.

**Authentication:**  
Requires a valid JWT token in the x-auth-token header.

**Request Body:**
```json
{
  "socketId": "string"
}
```

**Validation Rules:**
- `socketId`: Must not be empty

**Responses:**

| Status Code | Description |
|-------------|-------------|
| 200         | Socket ID updated successfully |
| 400         | Validation error |
| 401         | Unauthorized - Invalid or missing token |
| 404         | Captain not found |

**Success Response Example:**
```json
{
  "success": true,
  "message": "Socket ID updated successfully"
}
```

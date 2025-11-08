# Housr Rewards API Documentation

Welcome to the Housr Rewards API! This document provides detailed information about the available endpoints.

**Base URL**: `/api/v1`

---

## Authentication

### Auth Middleware

Many endpoints require authentication using a JSON Web Token (JWT). To authenticate, include the token in the `Authorization` header of your request with the "Bearer" scheme.

**Header Format:**
```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

### POST `/auth/login`

**(Development Route)** Authenticates a user and returns a JWT. In a production environment, this would be replaced with a more secure authentication method.

**Request Body:**

| Field  | Type   | Description            | Required |
| :----- | :----- | :--------------------- | :------- |
| `userId` | `number` | The ID of the user to log in. | Yes      |

**Example Request:**

```json
{
  "userId": 1
}
```

**Success Response (200 OK):**

Returns a JWT token.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

*   **400 Bad Request:** `userId` is not provided.
    ```json
    {
      "error": "userId is required"
    }
    ```
*   **401 Unauthorized:** Login fails (e.g., user not found).
    ```json
    {
      "error": "Login failed"
    }
    ```

---

## Users

### GET `/users/:userId`

Retrieves a specific user's public information.

**Authentication:** Required.

**URL Parameters:**

| Parameter | Type   | Description            |
| :-------- | :----- | :--------------------- |
| `userId`  | `number` | The ID of the user to retrieve. |

**Important:** You can only request information for the user associated with your authentication token.

**Success Response (200 OK):**

```json
{
  "id": 1,
  "name": "John Doe",
  "wallet_balance": 500,
  "next_payment_due": "2025-12-01T00:00:00.000Z",
  "cost_per_month": 100
}
```

**Error Responses:**

*   **401 Unauthorized:** No valid token provided.
*   **403 Forbidden:** Attempting to access another user's information.
    ```json
    { "error": "Forbidden: you can only view your own user info" }
    ```
*   **404 Not Found:** The user does not exist.
    ```json
    { "error": "User not found" }
    ```
*   **500 Internal Server Error:** Failed to retrieve user info.

### GET `/users/:userId/historical-perk-transactions`

Retrieves a list of all perk transactions for a specific user.

**Authentication:** Required.

**URL Parameters:**

| Parameter | Type   | Description                       |
| :-------- | :----- | :-------------------------------- |
| `userId`  | `number` | The ID of the user. |

**Important:** You can only request transactions for the user associated with your authentication token.

**Success Response (200 OK):**

```json
[
  {
    "id": 1,
    "date_time": "2025-11-08T23:50:37.000Z",
    "perk": {
      "id": 1,
      "title": "Free Coffee",
      "description": "Get a free coffee from our partner cafe.",
      "cost": 50,
      "image_url": "https://example.com/coffee.png"
    }
  }
]
```

**Error Responses:**

*   **401 Unauthorized:** No valid token provided.
*   **403 Forbidden:** Attempting to access another user's transactions.
*   **500 Internal Server Error:** Failed to retrieve historical perk transactions.

---

## Perks

### GET `/perks`

Returns a list of all available perks.

**Authentication:** Not required.

**Success Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Free Coffee",
    "description": "Get a free coffee from our partner cafe.",
    "cost": 50,
    "image_url": "https://example.com/coffee.png"
  },
  {
    "id": 2,
    "title": "Gym Discount",
    "description": "20% off your monthly gym membership.",
    "cost": 100,
    "image_url": "https://example.com/gym.png"
  }
]
```

**Error Response (500 Internal Server Error):**

```json
{
  "error": "Failed to fetch perks"
}
```

---

## Transactions

### POST `/tenancy-transactions`

Creates a new tenancy transaction to record a rent payment. This adds credits to the user's wallet and updates their next payment date.

**Authentication:** Required.

**Request Body:**

| Field          | Type   | Description                               | Required |
| :------------- | :----- | :---------------------------------------- | :------- |
| `monthsPaidFor`| `number` | The number of months the user is paying for. | Yes      |

**Success Response (201 Created):**

Returns the created transaction and the updated user information.

```json
{
  "transaction": {
    "id": 1,
    "amount": 200,
    "user_id": 1,
    "date_time": "2025-11-08T23:50:37.000Z"
  },
  "updatedUser": {
    "id": 1,
    "name": "John Doe",
    "wallet_balance": 700,
    "next_payment_due": "2026-02-01T00:00:00.000Z",
    "cost_per_month": 100
  }
}
```

**Error Responses:**

*   **400 Bad Request:** `monthsPaidFor` is missing or invalid.
    ```json
    { "error": "monthsPaidFor is required and must be a positive integer" }
    ```
*   **401 Unauthorized:** Transaction creation failed.

### POST `/perk-transactions`

Creates a new transaction for purchasing a perk, deducting the cost from the user's wallet.

**Authentication:** Required.

**Request Body:**

| Field  | Type   | Description             | Required |
| :----- | :----- | :---------------------- | :------- |
| `perkId` | `number` | The ID of the perk to purchase. | Yes      |

**Success Response (201 Created):**

```json
{
  "transaction": {
    "id": 2,
    "perk_id": 1,
    "user_id": 1,
    "date_time": "2025-11-08T23:55:00.000Z"
  },
  "updatedUser": {
    "id": 1,
    "name": "John Doe",
    "wallet_balance": 650,
    // ... other user fields
  }
}
```

**Error Responses:**

*   **400 Bad Request:** `perkId` is missing.
    ```json
    { "error": "perkId is required" }
    ```
*   **400 Bad Request:** User has insufficient balance.
    ```json
    { "error": "Insufficient balance" }
    ```
*   **401 Unauthorized:** Transaction creation failed for other reasons.

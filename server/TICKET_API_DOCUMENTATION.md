# NextByte Support Ticket System API Documentation

## Overview

This API provides a complete One-to-One Support Ticket System for NextByte Learning Platform. When a ticket is assigned to a mentor, they automatically receive an email notification with ticket details and meeting link.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All endpoints require authentication. Include your JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 1. Create a New Ticket

### Endpoint

```
POST /tickets
```

### Description

Creates a new support ticket with auto-generated serial number and default "open" status.

### Request Body

```json
{
  "title": "Need help with React Hooks",
  "description": "I'm struggling with understanding useState and useEffect hooks in React. Can someone help me understand the concepts and provide some examples?",
  "userId": 1
}
```

### Response (201 Created)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "serialNumber": 1,
  "title": "Need help with React Hooks",
  "description": "I'm struggling with understanding useState and useEffect hooks in React. Can someone help me understand the concepts and provide some examples?",
  "status": "open",
  "userId": 1,
  "mentorId": null,
  "meetLink": "https://meet.google.com/abc-defg-hij",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "mentor": null
}
```

---

## 2. Get All Tickets

### Endpoint

```
GET /tickets
```

### Description

Retrieves all tickets with user and mentor information.

### Response (200 OK)

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "serialNumber": 1,
    "title": "Need help with React Hooks",
    "description": "I'm struggling with understanding useState and useEffect hooks in React.",
    "status": "assigned",
    "userId": 1,
    "mentorId": 2,
    "meetLink": "https://meet.google.com/abc-defg-hij",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "mentor": {
      "id": 2,
      "name": "Sarah Johnson",
      "email": "sarah.johnson@nextbyte.com"
    }
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "serialNumber": 2,
    "title": "Database connection issues",
    "description": "Having trouble connecting to PostgreSQL database.",
    "status": "open",
    "userId": 3,
    "mentorId": null,
    "meetLink": "https://meet.google.com/abc-defg-hij",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z",
    "user": {
      "id": 3,
      "name": "Mike Wilson",
      "email": "mike.wilson@example.com"
    },
    "mentor": null
  }
]
```

---

## 3. Get Specific Ticket

### Endpoint

```
GET /tickets/:id
```

### Description

Retrieves a specific ticket by UUID.

### Response (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "serialNumber": 1,
  "title": "Need help with React Hooks",
  "description": "I'm struggling with understanding useState and useEffect hooks in React.",
  "status": "assigned",
  "userId": 1,
  "mentorId": 2,
  "meetLink": "https://meet.google.com/abc-defg-hij",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "mentor": {
    "id": 2,
    "name": "Sarah Johnson",
    "email": "sarah.johnson@nextbyte.com"
  }
}
```

---

## 4. Assign Mentor to Ticket

### Endpoint

```
PATCH /tickets/:id/assign
```

### Description

Assigns a mentor to a ticket and sends email notification to the mentor.

### Request Body

```json
{
  "mentorId": 2
}
```

### Response (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "serialNumber": 1,
  "title": "Need help with React Hooks",
  "description": "I'm struggling with understanding useState and useEffect hooks in React.",
  "status": "assigned",
  "userId": 1,
  "mentorId": 2,
  "meetLink": "https://meet.google.com/abc-defg-hij",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "mentor": {
    "id": 2,
    "name": "Sarah Johnson",
    "email": "sarah.johnson@nextbyte.com"
  }
}
```

### Email Notification Sent to Mentor

When a mentor is assigned, they receive an email with the following details:

**Subject:** `New Ticket Assignment - #1`

**Email Content:**

```
Hello Sarah Johnson,

You have been assigned a new support ticket. Please review the details below:

Ticket Details:
- Ticket Number: #1
- Title: Need help with React Hooks
- Meeting Link: https://meet.google.com/abc-defg-hij

Please contact the student using the provided Google Meet link to provide support.

Best regards,
NextByte Support Team
```

---

## 5. Close Ticket

### Endpoint

```
PATCH /tickets/:id/close
```

### Description

Closes a ticket by setting status to "closed".

### Response (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "serialNumber": 1,
  "title": "Need help with React Hooks",
  "description": "I'm struggling with understanding useState and useEffect hooks in React.",
  "status": "closed",
  "userId": 1,
  "mentorId": 2,
  "meetLink": "https://meet.google.com/abc-defg-hij",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:00:00.000Z",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "mentor": {
    "id": 2,
    "name": "Sarah Johnson",
    "email": "sarah.johnson@nextbyte.com"
  }
}
```

---

## 6. Update Ticket

### Endpoint

```
PATCH /tickets/:id
```

### Description

Updates ticket information (title, description, userId).

### Request Body

```json
{
  "title": "Updated: Need help with React Hooks and Context API",
  "description": "I'm struggling with understanding useState, useEffect hooks, and Context API in React. Need comprehensive help."
}
```

### Response (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "serialNumber": 1,
  "title": "Updated: Need help with React Hooks and Context API",
  "description": "I'm struggling with understanding useState, useEffect hooks, and Context API in React. Need comprehensive help.",
  "status": "assigned",
  "userId": 1,
  "mentorId": 2,
  "meetLink": "https://meet.google.com/abc-defg-hij",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T15:30:00.000Z",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "mentor": {
    "id": 2,
    "name": "Sarah Johnson",
    "email": "sarah.johnson@nextbyte.com"
  }
}
```

---

## 7. Delete Ticket

### Endpoint

```
DELETE /tickets/:id
```

### Description

Deletes a ticket permanently.

### Response (204 No Content)

No response body.

---

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Cannot assign a closed ticket",
  "error": "Bad Request"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Ticket with ID 550e8400-e29b-41d4-a716-446655440000 not found",
  "error": "Not Found"
}
```

### 404 Mentor Not Found

```json
{
  "statusCode": 404,
  "message": "Mentor with ID 999 not found",
  "error": "Not Found"
}
```

---

## Data Models

### Ticket Entity

```typescript
{
  id: string;                    // UUID
  serialNumber: number;          // Auto-incremental unique number
  title: string;                 // Ticket title
  description: string;           // Ticket description
  status: "open" | "assigned" | "closed";
  userId: number;                // User who created the ticket
  mentorId: number | null;       // Assigned mentor (admin)
  meetLink: string;              // Google Meet link
  createdAt: Date;
  updatedAt: Date;
  user?: User;                   // Related user data
  mentor?: Admin;                // Related mentor data
}
```

### Create Ticket DTO

```typescript
{
  title: string; // Required, 5-255 characters
  description: string; // Required, minimum 10 characters
  userId: number; // Required, existing user ID
}
```

### Assign Ticket DTO

```typescript
{
  mentorId: number; // Required, existing admin/mentor ID
}
```

---

## Email Configuration

The system uses the existing EmailService from the admin module. Make sure these environment variables are set:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000
```

---

## Complete Workflow Example

### 1. Student Creates Ticket

```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Help with JavaScript Promises",
    "description": "I need help understanding async/await and Promise handling in JavaScript.",
    "userId": 1
  }'
```

### 2. Admin Assigns Mentor

```bash
curl -X PATCH http://localhost:3000/api/tickets/550e8400-e29b-41d4-a716-446655440000/assign \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "mentorId": 2
  }'
```

**Result:** Mentor receives email notification with ticket details and meeting link.

### 3. Mentor Closes Ticket

```bash
curl -X PATCH http://localhost:3000/api/tickets/550e8400-e29b-41d4-a716-446655440000/close \
  -H "Authorization: Bearer <token>"
```

---

## Testing with Postman

1. **Create Ticket:**
   - Method: POST
   - URL: `{{base_url}}/tickets`
   - Headers: `Authorization: Bearer {{token}}`
   - Body (raw JSON):

   ```json
   {
     "title": "Test Ticket",
     "description": "This is a test ticket for API testing",
     "userId": 1
   }
   ```

2. **Assign Mentor:**
   - Method: PATCH
   - URL: `{{base_url}}/tickets/{{ticket_id}}/assign`
   - Headers: `Authorization: Bearer {{token}}`
   - Body (raw JSON):

   ```json
   {
     "mentorId": 2
   }
   ```

3. **Close Ticket:**
   - Method: PATCH
   - URL: `{{base_url}}/tickets/{{ticket_id}}/close`
   - Headers: `Authorization: Bearer {{token}}`

---

## Notes

- All tickets get a unique auto-incremental serial number
- Default status is "open" when created
- Default meeting link is "https://meet.google.com/abc-defg-hij"
- Email notifications are sent automatically when mentors are assigned
- The system uses existing admin users as mentors
- All timestamps are in ISO 8601 format
- UUIDs are used for ticket IDs for better security

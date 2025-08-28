# Ticket-User Integration Guide

This guide documents the new features that integrate ticket management with user management, specifically for handling "ticked" users and their associated tickets.

## New Features

### 1. User Tick Status

A new field `isTicked` has been added to the User entity to track users who have been "ticked" by administrators.

#### User Entity Changes

```typescript
@Column({ default: false })
isTicked: boolean;
```

### 2. Ticket Management by Student

#### New Endpoints

**Get tickets by Student ID:**

```
GET /tickets/student/:studentId
```

- Returns all tickets for a specific student
- Parameters: `studentId` (string) - The student's unique ID
- Response: Array of `TicketResponseDto`

**Get tickets by User ID:**

```
GET /tickets/user/:userId
```

- Returns all tickets for a specific user
- Parameters: `userId` (number) - The user's ID
- Response: Array of `TicketResponseDto`

### 3. User Tick Management

#### New Endpoints

**Tick a user:**

```
POST /users/tick/:id
```

- Marks a user as "ticked"
- Automatically closes all open tickets for that user
- Parameters: `id` (number) - User ID
- Response: Updated `User` object

**Untick a user:**

```
POST /users/untick/:id
```

- Removes the "ticked" status from a user
- Parameters: `id` (number) - User ID
- Response: Updated `User` object

**Get all ticked users:**

```
GET /users/ticked/list
```

- Returns all users who have been ticked
- Response: Array of `User` objects

### 4. Automatic Ticket Management

When a user is ticked, the system automatically:

1. Sets the user's `isTicked` status to `true`
2. Finds all open tickets for that user
3. Closes all open tickets (sets status to `CLOSED`)

## Service Methods

### TicketService Methods

```typescript
// Find tickets by student ID
async findByStudentId(studentId: string): Promise<TicketResponseDto[]>

// Find tickets by user ID
async findByUserId(userId: number): Promise<TicketResponseDto[]>

// Handle user ticked - close all open tickets
async handleUserTicked(userId: number): Promise<void>
```

### UserService Methods

```typescript
// Tick a user
async tickUser(id: number): Promise<User>

// Untick a user
async untickUser(id: number): Promise<User>

// Find all ticked users
async findTickedUsers(): Promise<User[]>
```

## Usage Examples

### Tick a User and Close Their Tickets

```javascript
// This will automatically close all open tickets for the user
const response = await fetch('/users/tick/123', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Get All Tickets for a Student

```javascript
const response = await fetch('/tickets/student/NEXTBYTE-000123', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
const tickets = await response.json();
```

### Get All Ticked Users

```javascript
const response = await fetch('/users/ticked/list', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
const tickedUsers = await response.json();
```

## Error Handling

- If a user is already ticked, attempting to tick them again will return a `BadRequestException`
- If a user is not ticked, attempting to untick them will return a `BadRequestException`
- If a student ID is not found, the ticket lookup will return a `NotFoundException`
- If ticket closing fails when ticking a user, the error is logged but doesn't prevent the tick operation

## Database Changes

A new column `isTicked` has been added to the `users` table:

- Type: `boolean`
- Default: `false`
- Nullable: `false`

## Security Considerations

- All endpoints are currently unguarded (JWT guards are commented out)
- Consider enabling authentication for production use
- Admin-only access should be enforced for tick/untick operations

## Integration Points

The integration between users and tickets is handled through:

1. **Module Dependencies**: UsersModule imports TicktesModule
2. **Service Injection**: UsersService injects TicktesService
3. **Automatic Actions**: TickUser method automatically calls handleUserTicked

This ensures that when a user is ticked, their tickets are automatically managed without requiring separate API calls.

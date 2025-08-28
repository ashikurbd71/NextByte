# Ticket Meet Link Feature

## Overview

Mentors can now add meeting links when assigning tickets to students. This feature allows for better coordination between mentors and students.

## How It Works

### 1. Ticket Creation

- When a student creates a ticket, no meet link is automatically generated
- Admin receives email notification about the new ticket
- Admin can assign the ticket to a mentor

### 2. Ticket Assignment with Meet Link

- Mentor can assign ticket and optionally provide a meet link
- Meet link is stored in the ticket record
- Both mentor and student receive email notifications with the meet link

### 3. Email Notifications

#### Admin Notification (Ticket Creation)

```
Subject: New Support Ticket Created - #[Ticket Number]
Recipient: ashikurovi2003@gmail.com

Content includes:
- Ticket details (number, title, description)
- Student information
- Note: Mentor can add meeting link when assigning
```

#### Mentor Notification (Ticket Assignment)

```
Subject: New Ticket Assignment - #[Ticket Number]
Recipient: mentor@email.com

Content includes:
- Ticket details
- Student information
- Meeting link (if provided)
- Instructions to contact student
```

#### Student Notification (Ticket Assignment)

```
Subject: Your Ticket Has Been Assigned - #[Ticket Number]
Recipient: student@email.com

Content includes:
- Ticket details
- Mentor information
- Meeting link (if provided)
- Instructions for meeting
```

## API Endpoints

### Assign Ticket with Meet Link

```http
POST /tickets/{id}/assign
Content-Type: application/json

{
  "mentorId": 123,
  "meetLink": "https://meet.google.com/abc-defg-hij" // Optional
}
```

### Response

```json
{
  "id": "ticket-id",
  "serialNumber": 1,
  "title": "Support Request",
  "description": "Need help with...",
  "status": "assigned",
  "userId": 456,
  "mentorId": 123,
  "meetLink": "https://meet.google.com/abc-defg-hij",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:30:00Z",
  "user": {
    "id": 456,
    "name": "Student Name",
    "email": "student@email.com"
  },
  "mentor": {
    "id": 123,
    "name": "Mentor Name",
    "email": "mentor@email.com"
  }
}
```

## Database Schema

### Ticket Entity

```typescript
@Entity('tickets')
export class Ticket {
  // ... other fields

  @Column({ nullable: true })
  meetLink: string;

  // ... other fields
}
```

## Features

✅ **Optional Meet Link**: Mentors can choose to add a meet link or not
✅ **Email Integration**: Meet links are included in all relevant email notifications
✅ **Flexible**: Works with any meeting platform (Google Meet, Zoom, Teams, etc.)
✅ **Backward Compatible**: Existing tickets without meet links work normally

## Usage Examples

### Assign without Meet Link

```json
{
  "mentorId": 123
}
```

### Assign with Meet Link

```json
{
  "mentorId": 123,
  "meetLink": "https://meet.google.com/abc-defg-hij"
}
```

### Assign with Zoom Link

```json
{
  "mentorId": 123,
  "meetLink": "https://zoom.us/j/123456789"
}
```

## Benefits

1. **Better Coordination**: Students and mentors have a direct meeting link
2. **Flexibility**: Supports any meeting platform
3. **Automated Notifications**: All parties receive the meet link automatically
4. **Optional Feature**: Doesn't break existing workflow
5. **Professional**: Streamlined meeting setup process

## Security Notes

- Meet links are validated as strings
- No automatic link generation (mentors provide their own)
- Links are stored as-is without modification
- Email notifications include clickable links

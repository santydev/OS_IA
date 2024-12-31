# API Documentation

## Authentication
All API endpoints require authentication using NextAuth.js.

### POST /api/auth/signin
Sign in with email and password.

### POST /api/auth/signup
Create a new user account.

## Calendar API

### GET /api/calendar/events
Get events with optional filters:
- startDate: ISO date string
- endDate: ISO date string
- status: 'scheduled' | 'cancelled' | 'completed'

### POST /api/calendar/events
Create a new event.

### PUT /api/calendar/events/:id
Update an existing event.

### DELETE /api/calendar/events/:id
Delete an event.

## System API

### GET /api/system/metrics
Get system metrics including:
- CPU usage
- Memory usage
- Active modules
- Total modules
- System uptime
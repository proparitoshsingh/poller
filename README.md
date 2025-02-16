# Polling Application

A real-time polling application built with React, Node.js, and PostgreSQL. Users can create polls, vote on options, and view live-updating results.

## Features

- Create polls with multiple options
- Vote on existing polls
- Real-time results with auto-refresh every 5 seconds
- Responsive UI that works on all devices
- Persistent data storage with PostgreSQL

## Tech Stack

**Frontend:** 
- React
- Styled Components
- Axios

**Backend:** 
- Node.js
- Express
- PostgreSQL

**Deployment:**
- Database: Render
- Backend: Render (tentative)
- Frontend: Vercel (tentative)

## API Endpoints

### Create a Poll
`POST /api/polls`

Request Body:
```json
{
  "question": "Your question here",
  "options": ["Option 1", "Option 2"]
}
```

Response:
```json
{
  "id": 1,
  "question": "Your question here",
  "created_at": "2023-08-20T12:34:56.789Z"
}
```

### Get Poll Details
`GET /api/polls/:id`


Response:
```json
{
  "id": 1,
  "question": "Poll question",
  "options": [
    {
      "id": 1,
      "text": "Option 1",
      "votes": 10
    },
    {
      "id": 2,
      "text": "Option 2",
      "votes": 5
    }
  ]
}
```

### Submit a Vote
`PUT /api/polls/:pollId/vote`

Request Body:
```json
{
  "optionId": 1
}
```

Response:
```json
{
  "success": true
}
```

## Database Schema

```
CREATE TABLE polls (
    id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    votes INTEGER DEFAULT 0,
    poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);
```


# MadaProject API Reference

Base URL: `http://localhost:3001/api/v1`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+261 34 00 000 00",
  "language": "FRENCH"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "language": "FRENCH"
    },
    "token": "jwt-token"
  },
  "message": "User registered successfully"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

#### Update Password
```http
PUT /auth/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "old-password",
  "newPassword": "new-password"
}
```

### Projects

#### List Projects
```http
GET /projects
Authorization: Bearer <token>
Query Parameters:
  - page (default: 1)
  - limit (default: 20)
  - status (comma-separated)
  - priority (comma-separated)
  - search
```

#### Get Project
```http
GET /projects/:id
Authorization: Bearer <token>
```

#### Create Project
```http
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Project",
  "description": "Project description",
  "status": "PLANNING",
  "priority": "HIGH",
  "type": "TRADITIONAL",
  "budget": 1000000,
  "startDate": "2024-01-01",
  "endDate": "2024-04-30"
}
```

#### Update Project
```http
PUT /projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Project Name",
  "description": "Updated description",
  "status": "ACTIVE",
  "completionPercent": 25
}
```

#### Delete Project
```http
DELETE /projects/:id
Authorization: Bearer <token>
```

### Tasks

#### List Tasks
```http
GET /tasks
Authorization: Bearer <token>
Query Parameters:
  - projectId
  - status (comma-separated)
  - priority (comma-separated)
  - assigneeId
  - search
```

#### Get Task
```http
GET /tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": "project-uuid",
  "title": "Task Title",
  "description": "Task description",
  "status": "TODO",
  "priority": "MEDIUM",
  "type": "TASK",
  "estimateHours": 8,
  "dueDate": "2024-02-15",
  "assigneeIds": ["user-uuid-1", "user-uuid-2"]
}
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "IN_PROGRESS",
  "completionPercent": 50,
  "score": 85,
  "grade": "B"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

### Notes

#### List Notes
```http
GET /notes
Authorization: Bearer <token>
Query Parameters:
  - projectId
  - type
  - search
```

#### Get Note
```http
GET /notes/:id
Authorization: Bearer <token>
```

#### Create Note
```http
POST /notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": "project-uuid",
  "title": "Meeting Notes",
  "content": "# Meeting Notes\n\n## Attendees\n- John Doe\n- Jane Smith\n\n## Discussion Points\n1. Project timeline\n2. Budget approval\n3. Resource allocation",
  "type": "MEETING",
  "tags": ["meeting", "project-alpha"]
}
```

#### Update Note
```http
PUT /notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "isPinned": true
}
```

#### Delete Note
```http
DELETE /notes/:id
Authorization: Bearer <token>
```

### Evaluations

#### List Evaluations
```http
GET /evaluations
Authorization: Bearer <token>
Query Parameters:
  - projectId
  - type
  - status
```

#### Get Evaluation
```http
GET /evaluations/:id
Authorization: Bearer <token>
```

#### Create Evaluation
```http
POST /evaluations
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": "project-uuid",
  "type": "MID_PROJECT",
  "title": "Mid-Project Evaluation",
  "criteria": {
    "quality": { "weight": 0.3, "maxScore": 100 },
    "timeline": { "weight": 0.25, "maxScore": 100 },
    "budget": { "weight": 0.2, "maxScore": 100 },
    "communication": { "weight": 0.15, "maxScore": 100 },
    "riskManagement": { "weight": 0.1, "maxScore": 100 }
  },
  "scores": {
    "quality": { "score": 85, "comments": "Good quality" },
    "timeline": { "score": 75, "comments": "Some delays" },
    "budget": { "score": 90, "comments": "Under budget" },
    "communication": { "score": 88, "comments": "Excellent" },
    "riskManagement": { "score": 70, "comments": "Needs improvement" }
  }
}
```

### AI Features

#### Generate Project with AI
```http
POST /ai/generate-project
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Create an e-commerce platform for Madagascar with mobile money integration",
  "requirements": [
    "Multi-language support (French, Malagasy, English)",
    "Mobile money payment integration (MVola, Airtel Money, Orange Money)",
    "Product catalog with categories",
    "Shopping cart and checkout",
    "Admin dashboard"
  ],
  "deadline": "2024-06-30",
  "budget": 15000000,
  "teamSize": 5,
  "industry": "E-commerce"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "projectName": "E-commerce Platform Madagascar",
    "description": "Full-featured e-commerce platform...",
    "phases": [
      {
        "name": "Conception",
        "description": "Analysis and design phase",
        "order": 1,
        "startDate": "2024-01-15",
        "endDate": "2024-02-15"
      }
    ],
    "tasks": [...],
    "milestones": [...],
    "estimatedBudget": 15000000,
    "estimatedDuration": 165,
    "confidence": 0.92
  }
}
```

#### Voice Command Processing
```http
POST /ai/voice-command
Authorization: Bearer <token>
Content-Type: application/json

{
  "command": "Create a task for John to review the design by Friday",
  "context": {
    "projectId": "project-uuid",
    "currentView": "tasks"
  }
}
```

### Notifications

#### List Notifications
```http
GET /notifications
Authorization: Bearer <token>
Query Parameters:
  - page (default: 1)
  - limit (default: 50)
  - isRead (true/false)
  - type
```

#### Mark as Read
```http
PUT /notifications/:id/read
Authorization: Bearer <token>
```

#### Mark All as Read
```http
PUT /notifications/read-all
Authorization: Bearer <token>
```

### Templates

#### List Templates
```http
GET /templates
Authorization: Bearer <token>
Query Parameters:
  - industry
  - type
  - search
```

#### Get Template
```http
GET /templates/:id
Authorization: Bearer <token>
```

#### Create Template from Project
```http
POST /templates/from-project
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": "project-uuid",
  "name": "E-commerce Template",
  "description": "Template for e-commerce projects",
  "industry": "E-commerce",
  "isPublic": false
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "error": "Error message",
  "details": {
    "field": "validation error"
  }
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Rate Limiting

API requests are rate limited to:
- 100 requests per 15 minutes per IP address
- 1000 requests per hour per authenticated user

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1642867200
```

## Webhooks (Future)

Webhooks can be configured to receive real-time notifications for events:
- Project created/updated/deleted
- Task created/updated/deleted
- Evaluation completed
- AI generation completed

Webhook payload format:
```json
{
  "event": "project.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "project-uuid",
    "name": "Project Name",
    "companyId": "company-uuid"
  }
}
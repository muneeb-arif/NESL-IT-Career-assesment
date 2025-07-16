# NES-IT-Career Assignment

A full-stack web application with Role-Based Access Control (RBAC) featuring a React frontend and Express.js backend.

## Submission Checklist

### Schema Designs and Index Notes (Part 1)

#### Database Schema Design
```javascript
// User Schema
const users = {
  u1: { id: 'u1', role: 'user' },
  u2: { id: 'u2', role: 'admin' }
}

// JWT Token Schema
{
  id: string,      // User ID
  role: string,    // 'user' or 'admin'
  iat: number,     // Issued at timestamp
  exp: number      // Expiration timestamp (1 hour)
}

// Post Schema (Mock)
{
  authorName: string,
  content: string,
  created: Date
}
```

#### API Endpoints
- `POST /api/login` - User authentication
- `DELETE /api/posts/:id` - Delete post (admin only)

#### Index Notes
- **Authentication**: JWT-based with role-based access control
- **Authorization**: Middleware checks user roles before allowing actions
- **Security**: CORS enabled, JWT secret protection
- **Frontend**: React with Vite, responsive design
- **Backend**: Express.js with middleware pattern

### Instructions to Run Your API & UI

#### Prerequisites
- Node.js (v18 or higher)
- npm

#### Backend Setup (API)
```bash
# Navigate to API directory
cd api

# Install dependencies
npm install

# Start the server
npm start
```
The API will run on `http://localhost:9000`

#### Frontend Setup (UI)
```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start the development server
npm run dev
```
The UI will run on `http://localhost:5173`

#### Environment Variables
- `JWT_SECRET`: Set to 'supersecret' (for development)
- `PORT`: Defaults to 9000 for API

### Test Commands & Results

#### API Tests
```bash
# Navigate to API directory
cd api

# Run tests
npm test
```

#### Test Results
```
 PASS  ./server.test.js
  RBAC DELETE /api/posts/:id
    ✓ 1. Admin can delete a post (18 ms)
    ✓ 2. User is forbidden to delete a post (9 ms)
    ✓ 3. Missing token returns 401 (10 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

#### Manual API Testing
```bash
# Test login with regular user
curl -X POST http://localhost:9000/api/login \
  -H "Content-Type: application/json" \
  -d '{"id": "u1"}'

# Test login with admin user
curl -X POST http://localhost:9000/api/login \
  -H "Content-Type: application/json" \
  -d '{"id": "u2"}'

# Test delete post with admin token
TOKEN="your_jwt_token_here"
curl -X DELETE http://localhost:9000/api/posts/123 \
  -H "Authorization: Bearer $TOKEN"
```

### Project Structure
```
NES-IT-Career/
├── api/                    # Backend API
│   ├── controller.js       # Route handlers
│   ├── middleware.js       # JWT authorization
│   ├── routes.js          # API routes
│   ├── server.js          # Express server
│   └── server.test.js     # API tests
├── web/                   # Frontend React app
│   ├── src/
│   │   ├── App.jsx        # Main app component
│   │   ├── LoginPage.jsx  # Login interface
│   │   ├── PostPage.jsx   # News feed
│   │   ├── auth.jsx       # Authentication context
│   │   └── index.css      # Styling
│   └── package.json
└── README.md              # This file
```

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for users and admins
- **CORS Protection**: Cross-origin request handling
- **Input Validation**: Request body validation
- **Error Handling**: Comprehensive error responses

### UI Features
- **Responsive Design**: Works on desktop and mobile
- **Ocean Blue Theme**: Modern gradient styling
- **Centered Layout**: Perfect alignment for all elements
- **Loading States**: Smooth user experience
- **Error Handling**: User-friendly error messages

### User Roles
- **Regular User (u1)**: Can view posts, cannot delete
- **Admin User (u2)**: Can view and delete posts

### Technologies Used
- **Backend**: Node.js, Express.js, JWT, Jest
- **Frontend**: React, Vite, Axios, CSS3
- **Testing**: Jest, Supertest
- **Styling**: Custom CSS with gradients and animations

---

**Note**: This project demonstrates a complete RBAC implementation with both frontend and backend components, featuring secure authentication, authorization, and a modern user interface.

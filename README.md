## EduConnect : Real-Time Student-Teacher Collaboration 

A full-stack web application connecting students and teachers with real-time Q&A functionality, feedback system, and video call integration.

---

##  Features

###  User Authentication
- Role-based access (Student/Teacher)
- JWT authentication
- Protected routes

###  Question Management
- Students can submit questions (text + image upload)
- Teachers can view and accept open questions
- Real-time updates using Socket.io

###  Feedback System
- Students can rate answered questions (1-5 stars)
- Teachers can view their feedback statistics
- Average rating calculation

###  Video Calling
- Integrated with ZEGO Cloud
- Real-time video communication
- Screen sharing capability

---

##  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- Socket.io-client
- ZEGO Express Engine

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT
- Socket.io

---

##  Installation Guide

###  Prerequisites
- Node.js (v14+)
- MongoDB
- ZEGO Developer Account

---

##  Backend Setup

### Clone the repository:

   ```bash
   git clone https://github.com/GiriAditya14/education.git

   ```



### Install dependencies:
```bash
npm install

```
### Create .env file:

```env
MONGO_URI=mongodb://localhost:27017/education-platform
JWT_SECRET=your_jwt_secret_here
PORT=5000
ZEGO_APP_ID=your_zego_app_id
ZEGO_SERVER_SECRET=your_zego_server_secret

```
### Start the backend server:

```bash
npm run dev

```

 ## Frontend Setup

### Navigate to frontend directory:

```bash

cd ../education-platform-frontend
```
### Install dependencies:

```bash
npm install
```

### Create .env file:
```env

REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_ZEGO_APP_ID=your_zego_app_id
REACT_APP_ZEGO_SERVER_SECRET=your_zego_server_secret
```
Start the frontend development server:

```bash
npm run dev
```

## Project Structure

### Backend (server/)
```
root
├── models/           # MongoDB schemas
│   ├── Feedback.js
│   ├── Question.js
│   └── User.js
├── routes/           # API endpoints
│   ├── auth.js
│   ├── feedback.js
│   ├── question.js
│   ├── teacher.js
│   └── zego.js
├── middleware/       # Authentication middleware
│   └── authMiddleware.js
server/
└── index.js          # Server entry point
```

### Frontend (education-platform-frontend/src/)

```

src/
├── components/
│   ├── Auth/         # Login/Register forms
│   ├── Feedback/     # Feedback components
│   ├── Questions/    # Question-related UI
│   ├── VideoCall/    # Video call interface
│   └── Layout/       # Reusable layout components
├── context/          # Authentication context
├── hooks/            # Custom React hooks
├── pages/            # Route pages
├── services/         # API communication services
└── App.jsx            # Main application file

```
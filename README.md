# AI-Powered Notes Application

A production-ready Notion-like notes app with AI features built using React, Node.js, Express, and PostgreSQL.

## Features

- User authentication (register/login) with JWT
- Create, read, update, delete notes
- AI-powered summarization of notes
- Extract key points from notes
- Ask questions about note content using AI
- Clean, responsive UI with Tailwind CSS

## Tech Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, JWT, bcrypt, PostgreSQL
- **AI**: OpenAI API
- **Database**: PostgreSQL

## Project Structure

```
NotesApplication/
├── ai-service/          # AI service module
├── backend/             # Express API server
├── database/            # SQL schema
├── frontend/            # React app
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- OpenAI API key

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install AI service dependencies (optional, integrated in backend)
cd ../ai-service
npm install
```

### 2. Setup PostgreSQL Database

1. Create a PostgreSQL database named `notes_app`
2. Run the schema file to create tables:

```bash
psql -U your_username -d notes_app -f ../database/schema.sql
```

### 3. Environment Variables

Create `.env` files in the backend directory:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/notes_app
JWT_SECRET=your_super_secret_jwt_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

Replace with your actual PostgreSQL credentials and OpenAI API key.

### 4. Run the Application

#### Start Backend
```bash
cd backend
npm run dev
```

#### Start Frontend
```bash
cd frontend
npm start
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 5. Usage

1. Register a new account or login
2. Create notes using the "New Note" button
3. Edit notes in the editor
4. Use AI features: Summarize, extract key points, or ask questions about your notes

## API Documentation

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Notes (Protected)
- `GET /api/notes` - Get all user notes
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### AI Features (Protected)
- `POST /api/ai/summarize` - Summarize note content
- `POST /api/ai/key-points` - Extract key points
- `POST /api/ai/ask` - Ask question about note

## Development

- Backend uses MVC architecture
- Frontend uses React hooks and functional components
- Database queries use raw SQL (no ORM)
- JWT tokens stored in localStorage

## Production Deployment

For production:
1. Set environment variables securely
2. Use a process manager like PM2 for backend
3. Build frontend: `npm run build` in frontend directory
4. Serve static files from backend or use a web server
5. Configure PostgreSQL connection for production
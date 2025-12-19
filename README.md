# 📋 Project Planner

A comprehensive full-stack project management application designed to help teams and individuals organize, track, and manage their projects efficiently. Built with modern web technologies, this application provides an intuitive interface for managing projects, features, user stories, and tasks in an agile workflow.

## ✨ Features

### Project Management
- **Create & Manage Projects**: Full CRUD operations for projects
- **Inline Editing**: Edit project names and descriptions directly
- **Project Dashboard**: Visual overview of all projects with progress tracking
- **Delete Protection**: Confirmation dialogs prevent accidental deletions

### Feature Organization
- **Kanban Board**: Organize features into "To Do", "In Progress", and "Done" columns
- **Feature Cards**: Visual cards showing feature progress and user story counts
- **Feature Details**: Modal view with complete feature information
- **Status Tracking**: Automatic status updates based on user story completion

### User Story Management
- **Accordion View**: Collapsible user stories with task details
- **Inline Editing**: Edit user story names and descriptions
- **Progress Indicators**: Visual progress bars showing task completion
- **Task Organization**: View and manage all tasks within each user story

### Task Management
- **Quick Status Toggle**: Cycle through "To Do" → "In Progress" → "Done" statuses
- **Inline Editing**: Edit task names on the fly
- **Visual Status Badges**: Color-coded status indicators
- **Task Tracking**: Real-time progress updates

### User Authentication & Security
- **Secure Authentication**: JWT-based authentication system
- **Password Reset**: Email-based password recovery
- **User Profiles**: Manage account details
- **Protected Routes**: Secure access to user-specific data

## 🛠 Technologies Used

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Chakra UI** - Component library for beautiful, accessible UI
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe backend development
- **PostgreSQL** - Relational database
- **TypeORM** - Object-Relational Mapping
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **class-validator** - DTO validation
- **sanitize-html** - XSS protection

### Development Tools
- **ESLint & Prettier** - Code quality and formatting
- **Git** - Version control

## 📁 Project Structure

```
project-planner/
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication & authorization
│   │   ├── users/         # User management
│   │   ├── projects/      # Project CRUD operations
│   │   ├── features/      # Feature management
│   │   ├── userStories/   # User story handling
│   │   ├── tasks/         # Task operations
│   │   ├── mail/          # Email services
│   │   ├── config/        # Configuration files
│   │   └── migrations/    # Database migrations
│   └── package.json
└── frontend/
    ├── src/
    │   ├── Components/    # Reusable UI components
    │   │   ├── Features/
    │   │   ├── Tasks/
    │   │   ├── UserStories/
    │   │   ├── Projects/
    │   │   └── Profile/
    │   ├── Pages/         # Route pages
    │   └── theme.ts       # Chakra UI theme
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shuveksha-tuladhar/project-planner.git
   cd project-planner
   ```

2. **Set up the database**
   - Create a PostgreSQL database
   - Note your database credentials

3. **Configure environment variables**

   Create a `.env` file in the `backend` directory:
   ```env
   # Database Configuration
   DB_PORT=5432
   DB_HOST=127.0.0.1
   DB_USERNAME=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=your_database_name

   # JWT Secret
   JWT_SECRET=your_jwt_secret_key

   # Email Configuration (for password reset)
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your_email@gmail.com
   MAIL_PASSWORD=your_app_password
   ```

   Create a `.env` file in the `frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:4000
   ```

### Running the Application

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Run database migrations
npm run migration:run

# Start the development server (port 4000)
npm run start:dev
```

#### Frontend Setup
```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server (port 3000)
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

## 📖 Usage

1. **Sign Up**: Create a new account
2. **Log In**: Access your dashboard
3. **Create a Project**: Start by creating your first project
4. **Add Features**: Organize your project with features
5. **Create User Stories**: Add user stories to each feature
6. **Manage Tasks**: Break down user stories into actionable tasks
7. **Track Progress**: Watch your progress update automatically as you complete tasks

## 🔐 API Endpoints

### Authentication
- `POST /auth/sign-up` - Register new user
- `POST /auth/log-in` - User login
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Projects
- `GET /auth/projects` - Get all user projects
- `GET /auth/project/:id` - Get project details
- `POST /auth/create-project` - Create new project
- `POST /auth/update-project` - Update project
- `POST /auth/delete-project` - Delete project

### Features
- `POST /auth/create-feature` - Create new feature
- `POST /auth/update-feature` - Update feature
- `POST /auth/delete-feature` - Delete feature

### User Stories
- `POST /auth/create-user-story` - Create new user story
- `POST /auth/update-user-story` - Update user story
- `POST /auth/delete-user-story` - Delete user story

### Tasks
- `POST /auth/create-task` - Create new task
- `POST /auth/update-task` - Update task
- `POST /auth/delete-task` - Delete task

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Shuveksha Tuladhar**

- GitHub: [@shuveksha-tuladhar](https://github.com/shuveksha-tuladhar)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by agile project management methodologies
- UI components powered by Chakra UI


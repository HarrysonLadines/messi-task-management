# Messi Task Management 

[![Live Demo](https://img.shields.io/badge/Live_Demo-Click_Here-0078D4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://messi-task-management.vercel.app)

Task application with JWT authentication and role-based permissions (RBAC).

> This was a university project focused on REST API architecture and security.

---

## 🛠 Stack

- **Backend:** Node.js, Express, Prisma
- **Frontend:** React
- **Database:** PostgreSQL (Neon)
- **Auth:** JWT
- **Language:** TypeScript

---

## Architecture Overview

- REST API architecture
- Role-based access control (RBAC)
- JWT authentication
- Separation between boards and tasks domain logic
- Prisma ORM for database abstraction

---

## 📋 Prerequisites

Before running the project, make sure you have installed:

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- **VS Code** or another code editor
- *(Optional)* **Postman** for API testing

---

## 🚦 Running  the project

### 1️⃣ Backend Setup

1. Clone the repository.
2. Go to the backend folder:

```bash
cd backend-express
```

3. Create the environment variables file:

```bash
touch .env
```

Add the following variables:

```env
DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
JWT_SECRET="tu_secreto_super_pro"
```

⚠️ Make sure `.env` is included in `.gitignore` and never committed.

4. Install dependencies:

```bash
npm install
```

5. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

6. Start the backend:

```bash
npm run dev
```

Runs by default at:  
- http://localhost:4321

---

### 2️⃣ Frontend Setup

1. Go to the frontend folder:

```bash
cd ../frontend-react
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm run dev
```

Runs by default at:  
- http://localhost:5173


---

## Usage

> **Important:** The backend must be running before starting the frontend.

1. Open the application in your browser.
2. Log in using the test credentials (see below) or register a new account.
3. Create and manage boards and tasks.
4. Share boards with other users by assigning roles.

---

##  API Documentation

###  General Notes

All protected endpoints require the following header:

```http
Authorization: Bearer <YOUR_TOKEN>
```

###  Roles & Permissions

- **owner** → Full control over the board  
- **editor** → Can modify tasks  
- **viewer** → Read-only access  

---

## 📌 Endpoints

###  Authentication

- `POST /api/users/register` → Register a new user  
- `POST /api/users/login` → Login and receive a JWT  

---

###  User Configuration

- `GET /api/configuraciones` → Get authenticated user settings  
- `PUT /api/configuraciones` → Update user settings (Theme, intervals, etc.)  

---

###  Boards

- `POST /api/tableros/add` → Create a board  
- `DELETE /api/tableros/delete/:boardId` → Delete a board (Owner only)  
- `GET /api/tableros/get` → Get all boards for the current user  
- `GET /api/tableros/getById/:boardId` → Get specific board details  

---

### Permissions

- `POST /api/permisos/tablero/:boardId/permisos`  
  → Assign a role (`editor`, `viewer`) to another user  

---

### Tasks

- `POST /api/tareas/add/:boardId` → Create a task (Editor/Owner)  
- `DELETE /api/tareas/delete/:boardId` → Delete a task (Editor/Owner)  
- `PATCH /api/tareas/edit/:boardId` → Edit task description (Editor/Owner)  
- `POST /api/tareas/toggle/:boardId` → Toggle task completion status  
- `POST /api/tareas/clearCompleted/:boardId` → Remove all completed tasks  
- `GET /api/tareas/getFiltered/:boardId` → Get tasks with filters (complete, incomplete, all)  
- `GET /api/tareas/search/:boardId` → Search tasks by text  

---

## Additional Notes

- Backend default port: **4321**
- Frontend default port: **5173**
- Remember to click the **"Save Configuration"** button to persist settings to the database
- JWT must be included in the `Authorization` header for all protected routes

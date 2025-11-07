# 🚀 TaskFlow API

A simple and secure RESTful API for managing user tasks with authentication and validation.

---

## 🧩 Base URL
```
https://your-domain.com/api
```

---

## 🔐 Authentication
All endpoints (except `/auth/register` and `/auth/login`) require a **JWT token**.

### Add this header to every authorized request:
```
Authorization: Bearer <your_token_here>
```

---

## 🧑‍💻 Auth Routes

### **POST /auth/register**
Register a new user.

#### 📤 Request Body:
```json
{
  "email": "user@example.com",
  "password": "mypassword123"
}
```

#### 📥 Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

---

### **POST /auth/login**
Login and receive an authentication token.

#### 📤 Request Body:
```json
{
  "email": "user@example.com",
  "password": "mypassword123"
}
```

#### 📥 Response:
```json
{
  "token": "your.jwt.token.here",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

---

## ✅ Task Routes

### **GET /tasks**
Get all tasks for the authenticated user.

#### 🔑 Requires Auth
#### 📥 Response:
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "PENDING",
    "userId": 1
  }
]
```

---

### **POST /tasks**
Create a new task.

#### 🔑 Requires Auth
#### 📤 Request Body:
```json
{
  "title": "Finish project report",
  "description": "Prepare slides and submit by Friday"
}
```

#### 📥 Response:
```json
{
  "id": 2,
  "title": "Finish project report",
  "description": "Prepare slides and submit by Friday",
  "status": "PENDING",
  "userId": 1
}
```

---

### **PUT /tasks/:id**
Update a task by its ID.

#### 🔑 Requires Auth
#### 📤 Request Body:
```json
{
  "title": "Finish project report (updated)",
  "status": "COMPLETED"
}
```

#### 📥 Response:
```json
{
  "id": 2,
  "title": "Finish project report (updated)",
  "description": "Prepare slides and submit by Friday",
  "status": "COMPLETED",
  "userId": 1
}
```

---

### **DELETE /tasks/:id**
Delete a task by ID.

#### 🔑 Requires Auth
#### 📥 Response:
```json
{
  "message": "Task deleted successfully"
}
```

---

## ⚠️ Error Responses

| Status | Meaning | Example |
|---------|----------|----------|
| `400` | Bad Request | `{"error": "Validation Error"}` |
| `401` | Unauthorized | `{"error": "Invalid or missing token"}` |
| `403` | Forbidden | `{"error": "Unauthorized"}` |
| `404` | Not Found | `{"error": "Task not found"}` |
| `500` | Server Error | `{"error": "Internal Server Error"}` |

---

## 🧠 Example Workflow

1. **Register** → `/auth/register`
2. **Login** → `/auth/login` → get your JWT token
3. **Create Tasks** → `/tasks`
4. **Get All Tasks** → `/tasks`
5. **Update Task** → `/tasks/:id`
6. **Delete Task** → `/tasks/:id`

---

## 🧰 Tech Stack
- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL / MySQL**
- **TypeScript**
- **JWT Authentication**
- **Zod Validation**
- **Winston Logger**

---

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/taskflow-api.git

# Navigate into the directory
cd taskflow-api

# Install dependencies
npm install

# Create a .env file and add your environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start the server
npm run dev
```

---

## 🧾 License
This project is licensed under the MIT License.

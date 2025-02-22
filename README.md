# Express.js Backend with PostgreSQL & RBAC

## 📌 Overview
This project is a backend system for managing corporate customers and sub-users with strict Role-Based Access Control (RBAC). It includes:

- Super Admin verification of corporate customers (Admins)
- Unique token & account number generation
- Admin financial transaction management
- Admins creating sub-users with different roles (Initiator, Approver, Viewer)
- Secure authentication and authorization using JWT
- PostgreSQL as the database
- Express.js as the backend framework
- Clean Architecture for scalability, testability, and maintainability

## 🚀 Features
- **Super Admin** can verify corporate customers (Admins) and generate unique account numbers.
- **Admins** can manage financial transactions and create sub-users.
- **RBAC** ensures users have access only to allowed actions.
- **PostgreSQL** as the database for structured data storage.
- **Middleware-based authentication** using JWT.

---

## 🏗️ Project Structure
```
/backend
  ├── /src
  │   ├── /config               # Database config
  │   ├── /controllers          # Handles HTTP requests
  │   ├── /routes               # API route handlers
  │   ├── /middlewares          # Authentication & RBAC
  │   ├── /services             # Business logic
  │   ├── /repositories         # Database queries
  │   ├── /models               # Database models
  │   ├── /utils                # Utility functions
  │   ├── app.ts                # Express app setup
  │   ├── server.ts             # Server entry point
```

---

## 🛠️ Setup Instructions
### 1️⃣ Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL installed and running
- Create a PostgreSQL database

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo.git
cd backend
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_secret_key
```

### 5️⃣ Run Database Migrations (if applicable)
```bash
npm run migrate  # If using a migration tool like Knex or Sequelize
```

### 6️⃣ Start the Server
```bash
npm run dev  # For development
npm start    # For production
```

The API will be available at `http://localhost:5000`

---

## 🔐 Authentication & Authorization
### 🔑 JWT Authentication
Every request must include an Authorization header:
```
Authorization: Bearer <your_token>
```
### 🛡️ Role-Based Access Control (RBAC)
| Role         | Permissions                                  |
|-------------|---------------------------------------------|
| SUPER_ADMIN | Verify corporate customers (Admins)        |
| ADMIN       | Manage transactions, create sub-users      |
| INITIATOR   | Initiate transactions                      |
| APPROVER    | Approve transactions                       |
| VIEWER      | View transactions                          |

---

## 📡 API Endpoints
### 🔹 Authentication
| Method | Endpoint          | Description                   | Role Required |
|--------|------------------|-------------------------------|---------------|
| POST   | /auth/login      | Login & get JWT token        | All Users     |

### 🔹 Super Admin
| Method | Endpoint               | Description                        | Role Required  |
|--------|-----------------------|------------------------------------|----------------|
| PATCH  | /api/admin/verify/:id | Verify a corporate Admin          | SUPER_ADMIN   |

### 🔹 Admin
| Method | Endpoint         | Description                 | Role Required |
|--------|-----------------|-----------------------------|---------------|
| POST   | /api/sub-users  | Create a sub-user          | ADMIN         |

---

## 🧪 Running Tests
To run unit tests:
```bash
npm test
```

---

## 📜 License
This project is licensed under the MIT License.

# 🌟 Social Media App

A modern full-stack **social media platform** built with:
- **Backend:** NestJS, MongoDB, Mongoose, JWT authentication
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui components

---

## ✨ Features

✅ User authentication (login & register)  
✅ Create & view posts
✅ Follow & unfollow other users  
✅ Timeline shows posts of followed users
✅ Responsive, clean UI with shadcn/ui & Tailwind CSS

---

## 📦 Tech Stack

| Layer      | Technology                                      |
|-----------:|-------------------------------------------------|
| Frontend   | Next.js (TypeScript, App Router), Tailwind CSS, shadcn/ui |
| Backend    | NestJS, MongoDB, Mongoose, JWT                  |
| Auth       | JSON Web Tokens (JWT)                           |
| Styling    | Tailwind CSS, shadcn/ui                         |

---

## ⚙️ Setup & Installation

Clone the repository:
```bash
git clone https://github.com/your-username/social-media-app.git
cd social-media-app

cd frontend
npm install

cd backend
npm install

# .env.example

# 📦 MongoDB connection URI
MONGODB_URI=your_mongodb_connection_uri

# 🔐 JWT secrets and expiry
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m

# 🔄 Refresh token secret and expiry
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d

# 🌐 Server port
PORT=4000

cd backend
npm run start:dev

cd frontend
npm run dev


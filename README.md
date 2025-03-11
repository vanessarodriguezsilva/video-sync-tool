# 🎯 Video Sync Tool

Welcome to **Video Sync Tool**!  
This project is a platform for managing and synchronizing videos from **Vimeo** and **Elai.io**, with a user management system based on roles.

---

## 🚀 **Features**
✅ Synchronize videos from **Vimeo** and **Elai.io**  
✅ Secure authentication system with **JWT**  
✅ Role-based access control (Superadmin, Admin, Editor, Viewer)  
✅ User management and editing  
✅ Elegant and modern UI with **Next.js** and **Tailwind CSS**  

---

## 📂 **Project Structure**
video-sync-tool/
├── src/                              # Backend and server-side logic
│   ├── db.js                         # MongoDB configuration and connection
│   ├── middleware/                   # Authentication and security middleware
│   │   └── auth.js                   # JWT authentication and role-based access control
│   ├── models/                       # MongoDB data models
│   │   └── User.js                   # User model schema
│   ├── routes/                       # API endpoints (Express.js)
│   │   ├── auth.js                   # Login and registration endpoints
│   │   └── users.js                  # User management endpoints
├── pages/                            # Next.js pages (frontend routes)
│   ├── _app.js                       # Custom app component (global context)
│   ├── index.js                      # Landing page (redirect to login)
│   ├── login.js                      # Login page
│   └── dashboard/                    # Protected routes under /dashboard
│       ├── index.js                  # Dashboard main page
│       ├── vimeo.js                  # Vimeo integration page
│       ├── elai.js                   # Elai.io integration page
│       └── users.js                  # User management page (protected)
├── components/                       # Reusable frontend components
│   ├── DashboardLayout.js            # Sidebar and navigation component
│   └── UserTable.js                  # User table component (if needed)
├── hooks/                            # Custom React hooks
│   └── useAuth.js                    # Hook for handling authentication state
├── public/                           # Static assets (images, icons, etc.)
│   └── favicon.ico                   # Favicon for the project
├── styles/                           # Global and component-specific styles
│   └── globals.css                   # Global Tailwind styles
├── .env                              # Environment variables (API keys, secrets)
├── .gitignore                        # Files and directories to ignore in Git
├── README.md                         # Project documentation
├── index.js                          # Custom Express.js server integrated with Next.js
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration (required for Tailwind)
├── jsconfig.json                     # Path aliases configuration
├── package.json                      # Project dependencies and scripts
└── yarn.lock / package-lock.json     # Dependency lock files

---
## 🛠️ **Installation**
1. Clone the repository:
```
git clone https://github.com/your-username/video-sync-tool.git
```
2. Navigate to the project directory:
```
cd video-sync-tool
```
3. Install dependencies:
```
npm install
```
4. Configure the .env file:
```
MONGODB_URI=mongodb://your-url/video-sync-tool
JWT_SECRET=your-secret-key
NEXT_PUBLIC_API_BASE_URL=http://your-url
```
5. Start the server:
```
npm run dev 
```

---
## 🚪 **API Endpoints**
Method	Route	Description	Authorization
POST	/api/auth/register	Create a new user	✅ Admin / Superadmin
POST	/api/auth/login	User login	✅ Public
GET	/api/users	Get all users	✅ Admin / Superadmin
PUT	/api/users/:id	Update user role	✅ Admin / Superadmin
DELETE	/api/users/:id	Delete a user	✅ Admin / Superadmin

---
## 🌟 **User Roles**
Role	Description	Permissions
Superadmin	Full control over the system	Create, edit, and delete any user
Admin	Manage specific user roles	Viewer, Editor
Editor	Can only manage video content	None
Viewer	Can only view content	None

---
## ✅ **Technologies Used**
🌐 Next.js → React framework for rendering and routing
🎨 Tailwind CSS → Rapid and customizable styling
🚀 Express.js → Lightweight and efficient backend
🗄️ MongoDB → NoSQL database
🔒 JWT → Token-based authentication
📹 Vimeo API → Video synchronization
🤖 Elai.io API → AI-based video generation

---
## 🤝 **Contributing**
Contributions are welcome!

Fork the repository.
Create a new branch (git checkout -b feature/new-feature).
Commit your changes (git commit -m 'Add new feature').
Submit a pull request.

---
## 👨‍💻 **Author**
Vanessa Rodriguez
📧 vanessarodriguezsilva@gmail.com
👾 GitHub
☕︎ Lover

---
📜 License
This project is licensed under the MIT license.
Feel free to use and modify it! 😎

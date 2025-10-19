
# 𝓷𝓸𝓽𝓮𝓼 - Note Taking Web App

<span style="font-size: 25px;">𝓷𝓸𝓽𝓮𝓼</span> is a full-featured, responsive **note-taking web application** built using the **MERN stack (MongoDB, Express.js, React.js, and Node.js)**.  
It allows users to **create, edit, organize, and manage notes efficiently**, with support for **tags, archiving, and search filters**.  
Designed with simplicity and productivity in mind, Notes offers a clean interface, seamless performance, and secure user authentication for a smooth experience across all devices.

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, Context API / Redux  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: JSON Web Token (JWT)  
- **Styling**: CSS3, Tailwind CSS 
- **API Client**: Axios 

## 🚀 Key Features  

### ✨ User Features  

- **User Authentication**  
  Secure login and registration using **JWT-based authentication**, ensuring safe access and data privacy.  

- **Create and Manage Notes**  
  - Add new notes with title, content, and optional tags.  
  - Edit or delete notes easily with real-time updates.  
  - Notes auto-save and sync seamlessly across sessions.  

- **Archive and Unarchive**  
  Move notes to archive for temporary storage without deleting them.    

- **Tag System**  
  Organize notes using specific **tags** for quick categorization and filtering.  

- **Search and Filter**  
  Instantly search notes by title, content, or tags using smart search.  

- **Pagination Support**  
  View notes in batches to improve performance and avoid clutter when handling large note collections.  

- **Dark / Light Theme**  
  Switch effortlessly between **dark** and **light** modes for a comfortable viewing experience anytime.  

- **Font Theme Selection**  
  Choose from **three elegant font families** to personalize your note-taking experience.  

- **Responsive UI**  
  A clean, minimal interface designed to adapt across desktops, tablets, and mobile screens.  

### 🔒 Authentication & Security  

- Secure password hashing using **bcrypt**.  
- JWT tokens for authenticated routes and session management.  
- Protected backend endpoints to prevent unauthorized access.  

### ⚙️ Backend Features  

- **RESTful API** built with **Express.js** for managing CRUD operations (create, read, update, delete).  
- **MongoDB Database** with well-structured schemas for users and notes.  
- **Middleware** for authentication and error handling.  
- **Efficient Data Fetching** with pagination, filters, and user-based queries.  

## 🌐 Project Setup

To set up and run this project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Nilesh-Diwakar/Note-Taking-Web-App-using-MongoDB.git
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory of frontend and add the following:
     ```env
     VITE_BACKEND_URL=your_backend_api_baseUrl
     ```
   
   - Create a `.env` file in the root directory of backend and add the following:
     ```env
     PORT=port_where_the_server_runs
     FRONTEND_URL=your_frontend_app_baseUrl
     DATABASE_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```

## 📦 Folder Structure  

```bash
notes-app/
│
├── frontend/                  # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth and app-level context
│   │   ├── hooks/           # Custom React hooks
│   │   ├── icons/           # SVGRs to use svg's as React component
│   │   ├── layouts/           # Common part of UI shared between pages
│   │   ├── pages/           # Main application pages
│   │   ├── utils/           # Helper functions (API, validation, format-date)
│   │   └── App.jsx
│   ├── .env                 # Environment variables 
│   └── package.json 
│
├── backend/                 # Backend
│   ├── config/              # DB connection
│   ├── controllers/         # Request handlers
│   ├── models/              # Mongoose schemas (User, Note)
│   ├── routes/              # API routes
│   ├── middleware/          # Auth & error handling
│   ├── utils/               # handler for allTags of a user
│   ├── .env                 # Environment variables
│   ├── package.json  
│   └── server.js
│
└── README.md
```

## 🧠 Future Enhancements  

- 🖋️ **Rich Text Editor**: Add text formatting, color, and markdown support.   
- 🔔 **Reminders and Notifications**: Notify users of pending tasks or updates.  
- 🧑‍💻 **Collaborative Notes**: Share and edit notes with other users in real time. 

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, fork the repository, and open pull requests.


## 🌟 Acknowledgements

- Thanks to the developers and contributors of MongoDB, Express.js, React.js, and Node.js for their fantastic tools and libraries.

- Thanks to frontendmentor.io and their team for this project.


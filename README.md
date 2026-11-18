# ALzikrayat-mern
 git clone <>
A full-stack Photo Sharing Web Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This project is a modern rebuild of the classic "Alzikrayat" application, moving from a hand-written MVC architecture to a scalable REST API and a dynamic React Single Page Application (SPA).

##  Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [REST API Endpoints](#-rest-api-endpoints)
- [Project Structure](#-project-structure)
- [How to Run the Project](#-how-to-run-the-project)
- [Environment Variables](#-environment-variables)
- [Security Practices](#-security-practices)

---
##  Features
- User Authentication: Secure Register/Login system. Passwords are hashed using bcrypt. Session state is managed via React Context & localStorage.
- Photo Management (CRUD): 
  - Upload photos with titles and descriptions (handled via multer).
  - View photos in a responsive Gallery.
  - Grid/List View Toggle: Users can switch between a grid layout and a detailed list layout.
  - Secure Deletion: Users can ONLY delete their own photos (verified server-side).
- Commenting Engine: Logged-in users can post comments on any photo. Comments update instantly on the UI without a full page reload.
- Responsive UI: Clean, modern design that adapts to mobile, tablet, and desktop screens.

---

##  Tech Stack
Frontend:
- React.js (Vite)
- React Router (for client-side routing)
- Axios (for API consumption)
- Vanilla CSS (Inline styles for component scoping)

Backend:
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- Joi (Server-side input validation)
- Bcrypt.js (Password hashing)
- Multer (Multipart/form-data handling for image uploads)

---

##  REST API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register a new user | Public |
| POST | /api/auth/login | Login & retrieve user profile | Public |

### Photos
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET  | /api/photos | Get all photos | Public |
| GET  | /api/photos/:id | Get details of a single photo | Public |
| POST | /api/photos | Upload a new photo | Private (Requires x-user-id header) |
| DELETE| /api/photos/:id | Delete a photo (Owner only) | Private (Requires x-user-id header) |

### Comments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET  | /api/photos/:id/comments | Get all comments for a photo | Public |
| POST | /api/photos/:id/comments | Add a comment to a photo | Private (Requires x-user-id header) |

---

##  Project Structure
`text
ALzikrayat-mern/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Navbar, etc.
│   │   ├── context/        # AuthContext for global state
│   │   ├── pages/          # Home, Gallery, PhotoDetail, AddPhoto, LoginRegister
│   │   ├── App.jsx         # Main Router configuration
│   │   └── main.jsx        # React entry point
│   └── vite.config.js      # Vite proxy configuration to Express
│
├── server/                 # Express Backend
│   ├── controllers/        # Business logic (auth, photo, comment)
│   ├── middleware/         # Joi validation & Multer upload config
│   ├── models/             # Mongoose Schemas (User, Photo, Comment)
│   ├── routes/             # Express routers
│   ├── uploads/            # Stored image files
│   └── server.js           # Express app entry point
│
└── README.md

---

## How to Run the Project

1. Clone the repository
bash
git clone <رابط_جيتهاب_الخاص_بمشروعك>
cd ALzikrayat-mern

2. Backend Setup (Server)

Open a terminal and navigate to the server folder:

bash
cd server
npm install
`
Create a .env file in the server folder and add your variables (see Environment Variables).
Start the backend server:

npm run dev
The API will run on http://localhost:5000

3. Frontend Setup (Client)

Open a new terminal window (keep the backend running) and navigate to the client folder:

cd client
npm install
npm run dev
The app will run on http://localhost:5173

4. Open the App

Open your browser and go to http://localhost:5173.

---

## Environment Variables

Create a .env file in the server/ directory and add the following:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/alkzikrayat?retryWrites=true&w=majority
(Ensure you replace the MongoDB URI with your actual connection string. Never commit this file to GitHub).

---

## Security Practices Implemented

1. Password Hashing: Passwords are never stored in plain text. bcrypt is used with a salt round of 10.
2. Data Validation: Joi is used on the server-side to sanitize and validate incoming requests (Register, Login).
3. Ownership Verification: The DELETE route explicitly checks if the user requesting the deletion matches the userId of the photo owner in MongoDB.
4. Environment Variables: Sensitive keys (MONGO_URI) are hidden using dotenv and excluded via .gitignore.

---

Developed as part of the Advanced Web Technologies Course - .
Author: <
Raheeg Abd Alazeem Mohamed

Sudan University of Science and Technology
>

`

# 🏠 Ashiyaan — Property Listing & Booking Platform

**Ashiyaan** is a full-stack web application that allows users to **list, browse, book, and review properties** such as houses, rooms, and hotels.  
Property owners can showcase their listings with detailed descriptions and images, while users can explore options, make bookings, and leave reviews — all within a secure, responsive interface.

---

## 🚀 Features

-  **Property Listings** — Owners can create listings with images, pricing, and detailed descriptions.  
-  **Search & Filter** — Users can easily search and filter properties by location or name.  
-  **Booking System** — Secure and smooth booking flow for properties.  
-  **Reviews & Ratings** — Users can leave feedback and ratings on booked properties.  
-  **Authentication & Sessions** — Implemented with **Passport.js** and **express-sessions** for secure login/logout.  
-  **Flash Messages** — User feedback for actions like login, logout, or booking handled via **connect-flash**.  
-  **Responsive UI** — Built with **Bootstrap** and **EJS templates** for a clean and user-friendly interface.  
-  **Cloud Deployment** — Hosted on **Render** with **MongoDB Atlas** as the cloud database.

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend** | HTML, CSS, Bootstrap, EJS Templates |
| **Backend** | Node.js, Express.js, REST APIs |
| **Authentication** | Passport.js, express-sessions, connect-flash |
| **Database** | MongoDB, MongoDB Atlas |
| **Hosting** | Render |
| **Version Control** | Git, GitHub |

---

## ⚙️ Installation & Setup

To run **Ashiyaan** locally on your system:

```bash
# Clone the repository
git clone https://github.com/RaviShankar-coder/Ashiyaan.git

# Navigate into the project folder
cd Ashiyaan

# Install dependencies
npm install

# Create a .env file in the root directory and add:
# MONGODB_URI=<your-mongodb-atlas-connection-string>

# Start the server
node index.js

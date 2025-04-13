# 🚢 Vessel Tracker Web Application

A full-stack web application to visualize leased vessel locations on an interactive map, with support CRUD operations, and a searchable sidebar list.

---

## 📌 Project Overview

This project was built for a client in the marine industry to visually track and manage their vessels. Users can view, add, edit, and delete vessels on a map interface, with updates happening in real-time across all connected clients.

---

## 🛠️ Tech Stack

| Layer      | Technology       | Reasoning                                                                 |
|------------|------------------|---------------------------------------------------------------------------|
| **Frontend** | Vue.js            | Reactive UI, component-based, lightweight for SPAs                       |
| **Map API**  | Google Maps API   | Industry-standard map platform, rich documentation and marker support   |
| **Backend**  | Node.js + Express | Fast, scalable RESTful API layer                                        |
| **Database** | MongoDB           | NoSQL, flexible schema, ideal for geolocation data                      |

---

## 🎯 Features

- 🗺️ Interactive Google Map displaying all vessel locations
- 📋 Sidebar list with search and filter capabilities
- ➕ Add, ✏️ Edit, 🗑️ Delete vessels


---
## 🧭 Development Approach

### 1. 📐 Architecture Planning

At the start of the project, I focused on planning a clean and scalable structure for the app. I wanted to make sure the system was easy to build on later and would work well as more features were added. I chose a RESTful architecture, which basically means the frontend (Vue) talks to the backend (Express) in a simple and consistent way using standard API calls. This approach keeps everything organized and easy to manage.

#### 📌 Key Design Choices:

- **Vue.js** was selected for the frontend to leverage its reactive data binding and component-based architecture. This allowed me to isolate logic into reusable modules like the map and vessel list, making the application more maintainable.
- **Express.js with Node.js** was used for the backend to provide a lightweight and high-performance API layer. Express is minimal yet powerful, which makes it ideal for building REST APIs quickly and cleanly.
- **MongoDB** was chosen for data storage due to its schema flexibility and ease of handling nested JSON-like structures—perfect for storing vessel data like coordinates.

> 💡 I deliberately prioritized **functionality over styling** for the creation of the application. The focus was on implementing the core features—data flow, interactivity, and CRUD operations for vessal managment as these are the most critical elements for the client’s operational needs. While visual enhancements are valuable, they were considered secondary to ensuring the application works reliably, efficiently, and accurately represents vessel data on the map.

#### 🧠 Why I Started with the Backend

I will first approach the development with the backend for several strategic reasons:

- **Data-First Approach:** Defining the schema and API endpoints early allowed me to finalize how vessel data would be structured, stored, and manipulated.
- **API Contract Clarity:** Having working APIs from the start ensured that frontend development could progress independently, knowing exactly what data formats to expect.
- **Decoupling Logic from UI:** This approach enabled me to test and validate business logic independently of the UI, improving debugging and testing efficiency.

By establishing a robust backend first, I was able to create a foundation that supports the frontend and ensures smooth future scalability—for example, adding authentication or analytics.


---

### 2. 🖥 Backend Development
- [x] Create `backend` and `frontend` folder
- [x] Initialized a `Node.js` project with `Express` in `backend` folder.
- [x] Defined the **`Vessel`** model with fields:
  - `id`, `name`, `latitude`, `longitude`, `createdAt`
- [x] Created REST endpoints for:
  - `GET`, `POST`, `PUT`, `DELETE` vessels.
- [x] Connected to MongoDB via Mongoose.
- [x] Used environment variables for DB config.



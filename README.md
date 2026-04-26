# SuperBuzzsite

SuperBuzzsite is a web-based version of the SuperBuzz mobile concept designed for University of Wolverhampton students. It helps students access campus information, events, transport, and services in one interactive platform.

---

## 🌐 Overview

This project is an interactive student dashboard that integrates real-time data, Supabase backend services, and campus information tools.

It includes:
- Event management system (create + view events)
- Authentication system (login/signup/reset)
- FAQ chatbot assistant
- Live bus timetable integration
- Campus map with 3D building visualization
- Library and gym schedules

---

## ⚙️ Tech Stack

- HTML5
- TailwindCSS
- Vanilla JavaScript (ES Modules)
- Supabase (Auth + Database)
- MapLibre GL JS (3D Map rendering)
- OpenStreetMap Overpass API
- Buses & Trains API

---

## 🧱 Project Structure
/js
├── home.js # Main dashboard logic (events, chat, UI, transport)
├── map.js # Campus 3D map system
├── logon.js # Authentication system
├── auth.js # Supabase auth wrapper
├── supabaseClient.js

/home.html # Main dashboard
/map.html # Campus map view
/logon.html # Login / Signup system

---

## 🔑 Authentication System

Authentication is handled using Supabase.

### Features:
- University email validation
- Secure login/signup
- Password reset flow

### Flow:
Login → Supabase Auth → Redirect to home page

---

## 📅 Events System

Events are stored in Supabase and dynamically loaded into the UI.

### Features:
- Fetch events from database
- Render event cards dynamically
- Create new events via modal form
- View event details in popup modal

---

## 💬 Chatbot System

A lightweight FAQ-based chatbot system.

### How it works:
- User message is matched against keyword list
- If a match is found → return FAQ answer
- Otherwise fallback response is shown

---

## 🚌 Transport System

Live bus data is fetched using the Buses & Trains API.

### Features:
- Displays next bus departures
- Uses real stop IDs
- Updates dynamically on request

---

## 🗺️ Campus Map System

Interactive 3D map built using MapLibre GL JS.

### How it works:
1. Fetch building data from OpenStreetMap (Overpass API)
2. Convert data into GeoJSON format
3. Render 3D buildings on map
4. Display building labels
5. Click building → opens info drawer

---

## 🧩 Core Features Summary

- 📅 Events system (Supabase-backed)
- 💬 Chatbot (FAQ keyword matching)
- 🚌 Live bus tracking
- 🏋️ Gym + 📚 Library schedules
- 🗺️ 3D campus map
- 🔐 Authentication system

---

## 📌 Key Notes for Developers

- The project is modular but currently uses a single large `home.js`
- Most UI interactions are handled via DOM event listeners
- Supabase handles all backend data storage
- Map system depends on OpenStreetMap + MapLibre GL

---

## 🚀 Future Improvements

- Convert JS into modular architecture (events.js, chat.js, etc.)
- Add real AI chatbot instead of keyword matching
- Add real-time updates using Supabase subscriptions
- Store event attendance in database
- Improve role system (admin vs student)
- Refactor modal system into reusable component manager

---

## 👨‍💻 Author Notes

This project was built as a campus productivity and information tool for University of Wolverhampton students, combining multiple APIs and services into a single unified platform.
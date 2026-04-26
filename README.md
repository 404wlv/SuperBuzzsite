# SuperBuzzsite

SuperBuzzsite is a web-based version of the SuperBuzz mobile concept designed for University of Wolverhampton students. It helps students access campus information, events, transport, and services in one interactive platform.

---

## 🌐 Overview

This project is an interactive student dashboard that integrates real-time data, Supabase backend services, and campus tools.

It includes:
- Event management system (create + view events)
- Authentication system (login/signup/reset/password recovery)
- FAQ chatbot assistant
- Live bus timetable integration
- Campus map with 3D building visualization
- User profile system
- Daily check-in streak system (gamification)

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
├── dailyCheckin.js # Daily streak system
├── profile.js # User profile system
├── map.js # Campus 3D map system
├── logon.js # Authentication system
├── auth.js # Supabase auth wrapper
├── supabaseClient.js # Supabase connection

/stuff # Images and assets

/home.html # Main dashboard
/map.html # Campus map view
/logon.html # Login / Signup system
/profile.html # User profile page
/404.html # Developer documentation page
/index.html # Entry page

---

## 🔑 Authentication System

Authentication is handled using Supabase Auth.

### Features:
- University email validation  
- Secure login/signup  
- Password reset flow  
- Session-based authentication  

### Flow:
Login → Supabase Auth → Home Dashboard

---

## 📅 Events System

Events are stored in Supabase and dynamically loaded.

### Features:
- Fetch events from database  
- Render event cards dynamically  
- Create new events via modal  
- View event details in popup modal  
- Category-based styling  

---

## 💬 Chatbot System

FAQ-based chatbot assistant.

### How it works:
- User input captured  
- Keyword matching against FAQ list  
- Matching answer returned  
- Fallback response if no match  

---

## 🚌 Transport System

Live bus data via Buses & Trains API.

### Features:
- Real-time departures  
- Multiple stops supported  
- ATCO stop IDs used  
- Dynamic loading per request  

---

## 🗺️ Campus Map System

3D map built using MapLibre GL JS.

### Process:
1. Fetch OSM data via Overpass API  
2. Convert to GeoJSON  
3. Render 3D buildings  
4. Add labels  
5. Click building → info drawer opens  

---

## 👤 Profile System

User profile management via Supabase.

### Features:
- Display email + user ID  
- Edit display name  
- Save to Supabase metadata  
- Logout support  

---

## 🎯 Daily Check-in System

Gamified streak system.

### Features:
- Daily check-ins  
- Streak tracking  
- Progress bar toward reward  
- Stored in Supabase  

---

## 🧩 Core Features Summary

- Events system  
- Chatbot assistant  
- Live bus tracking  
- Campus map  
- Profile system  
- Daily check-in system  
- Authentication system  

---

## 📌 Key Notes

- Modular but still file-based JS structure  
- Supabase handles backend completely  
- Heavy DOM event usage  
- Map system depends on OSM + MapLibre  
- API-driven architecture  

---

## 🚀 Future Improvements

- Refactor into fully modular architecture  
- Replace chatbot with AI model  
- Add real-time Supabase subscriptions  
- Admin event approval system  
- Role-based access control  
- Mobile app version  
- Map navigation routing  

---

## 👨‍💻 Author

Built for University of Wolverhampton students as a unified campus platform combining multiple APIs, tools, and services into one system.
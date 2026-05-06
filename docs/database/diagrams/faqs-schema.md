# FAQ System Flow Diagram

## Purpose

This diagram shows how the FAQ feature works across the SuperBuzz platform, linking the frontend, database table, and chatbot-style response flow.

It reflects the implemented logic where FAQ records are stored in Supabase and then loaded into the frontend to support keyword-based responses in the chat feature.

---

## System Architecture

```text
+----------------------+
|     User Device      |
|  (Mobile / Desktop)  |
+----------+-----------+
           |
           v
+-------------------------------+
| Frontend (HTML + JS Modules)  |
| - home.html                   |
| - home.js                     |
+---------------+---------------+
                |
                | User opens chat / sends message
                v
+-------------------------------+
|     Supabase Database         |
|     Table: faqs               |
|                               |
| Fields used:                  |
| - id                          |
| - keywords                    |
| - answer                      |
| - created_at                  |
+---------------+---------------+
                |
                | read FAQ records
                v
+-------------------------------+
| Frontend Chat Logic           |
| - loads FAQ data              |
| - splits keywords             |
| - matches user input          |
| - selects answer              |
+---------------+---------------+
                |
                v
+-------------------------------+
| User Feedback                 |
| - matching answer returned    |
| - fallback message shown      |
|   if no match is found        |
+-------------------------------+

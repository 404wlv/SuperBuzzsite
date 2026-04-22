# FAQs Table

## Purpose
The `faqs` table stores frequently asked questions data used to support chatbot-style responses and helpful information within the SuperBuzzsite application.

## Main Fields
- `id` – unique identifier for each FAQ entry
- `keywords` – stores the keywords or trigger terms linked to a response
- `answer` – stores the response or answer returned for the FAQ
- `created_at` – timestamp showing when the FAQ entry was created

## Relationship
- this table does not currently show a direct foreign key relationship in the schema provided
- it mainly functions as a content/support table for the application

## Role in the System
This table supports FAQ and chatbot-related functionality by storing question triggers and response content that can be retrieved and displayed in the application.

## Notes
The table is part of the backend structure created in Supabase and supports dynamic retrieval of stored support information rather than hardcoding every response in the frontend.

## Security
Access to this table can be controlled depending on the application requirements. For example, read access may be allowed where appropriate, while write access should remain restricted to authorised users or administrators.

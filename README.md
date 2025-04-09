Fastify Email Server
This project is a lightweight email server built with Fastify, designed to handle single and bulk email sending via SMTP using Nodemailer. It provides a simple API for sending confirmation codes to individual users and bulk emails to multiple recipients. The server also serves a static HTML page from the public directory.

Features
Single Email Sending (/api/feedback)
Endpoint: POST /api/feedback
Purpose: Sends an email with a special confirmation code to a single recipient.
Request Body:
json

Collapse

Wrap

Copy
{
  "email": "user@example.com",
  "code": "ABC123"
}
Response:
Success: 200 OK with { success: true, message: "Email sent successfully." }
Error: 400 Bad Request if fields are missing, or 500 Internal Server Error if sending fails.
Details: The email subject is hardcoded as "Code Confirmation", and the body includes the provided code in a Japanese message (スペシャルコードをゲット！${code}).
Bulk Email Sending (/users/email/send-bulk)
Endpoint: POST /users/email/send-bulk
Purpose: Sends emails to multiple recipients with a custom subject and content.
Request Body:
json

Collapse

Wrap

Copy
{
  "emails": ["user1@example.com", "user2@example.com"],
  "subject": "Newsletter",
  "content": "Hello, this is a test email!"
}
Response:
Success: 200 OK with { success: true, message: "Emails sent successfully to X recipients." }
Error: 400 Bad Request if required fields are missing or invalid, or 500 Internal Server Error if sending fails.
Details: Automatically detects if the content is HTML (based on <html presence) and sends it accordingly as HTML or plain text.
Static File Serving
Serves static files from the public directory.
The root route (/) serves index.html by default.
Prerequisites
Node.js: Version 14.x or higher.
SMTP Server: An SMTP server (e.g., Gmail, SendGrid) with credentials configured in a .env file.
Installation
Clone the repository:

bash

Collapse

Wrap

Copy
git clone https://github.com/yourusername/your-repo.git
cd your-repo
Install dependencies:

bash

Collapse

Wrap

Copy
npm install
Create a .env file in the root directory with the following variables:

text

Collapse

Wrap

Copy
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
EMAIL_FROM="Your Name <your-email@example.com>"
PORT=3123
Start the server:

bash

Collapse

Wrap

Copy
npm start
The server will run on http://localhost:3123 (or the port specified in PORT).

Dependencies
fastify: High-performance web framework.
@fastify/static: For serving static files.
@fastify/cors: For enabling CORS.
nodemailer: For sending emails via SMTP.
dotenv: For loading environment variables from a .env file.
Project Structure
text

Collapse

Wrap

Copy
your-repo/
├── public/           # Static files (e.g., index.html)
├── config.js         # Email sending logic with Nodemailer
├── index.js          # Main server file with Fastify routes
├── .env              # Environment variables (not tracked)
├── package.json      # Project metadata and dependencies
└── README.md         # This file
Usage Examples
Send a Single Email:
bash

Collapse

Wrap

Copy
curl -X POST http://localhost:3123/api/feedback \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "code": "XYZ789"}'
Send Bulk Emails:
bash

Collapse

Wrap

Copy
curl -X POST http://localhost:3123/users/email/send-bulk \
-H "Content-Type: application/json" \
-d '{"emails": ["user1@example.com", "user2@example.com"], "subject": "Test", "content": "Hello World!"}'
Notes
The server uses Fastify’s built-in logger for request and error logging.
Ensure your SMTP credentials are secure and not exposed in the codebase.
The server supports both plain text and HTML email content for bulk sending.
License
 (or specify your preferred license).

# MERN-GPT

MERN-GPT is an AI chatbot application built using the MERN stack (MongoDB, Express, React, Node.js, and TypeScript) with Google Gemini AI. This application allows users to chat with AI, with each message being stored in a database and retrievable for future reference.

## Features

- User authentication (signup, login, logout)
- Secure communication using JWT tokens and HTTP-only cookies
- Chat with AI using Google Gemini AI
- Store and retrieve chat messages from the database
- Responsive UI built with React and Material-UI
- Real-time chat updates

## Project Structure
```
.
├── clients
│   ├── public
│   │   ├── airobot.png
│   │   ├── chat.png
│   │   ├── nuclear.jpg
│   │   ├── openai.png
│   │   ├── robot.png
│   │   ├── robott.png
│   │   └── vite.svg
│   ├── src
│   │   ├── components
│   │   │   ├── chat
│   │   │   │   └── ChatItem.tsx
│   │   │   ├── footer
│   │   │   │   └── Footer.tsx
│   │   │   ├── shared
│   │   │   │   ├── CustomizedInput.tsx
│   │   │   │   ├── Logo.tsx
│   │   │   │   └── NavigationLink.tsx
│   │   │   └── typer
│   │   │       └── TypingAnim.tsx
│   │   ├── context
│   │   │   └── AuthContext.tsx
│   │   ├── helpers
│   │   │   └── api-communicator.ts
│   │   ├── pages
│   │   │   ├── Chat.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── NotFound.tsx
│   │   │   └── Signup.tsx
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── .env
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── server
│   ├── src
│   │   ├── config
│   │   │   └── geminiai-config.ts
│   │   ├── controllers
│   │   │   ├── chat-controllers.ts
│   │   │   └── user-controllers.ts
│   │   ├── db
│   │   │   └── connection.ts
│   │   ├── models
│   │   │   └── User.ts
│   │   ├── routes
│   │   │   ├── chat-routes.ts
│   │   │   ├── index.ts
│   │   │   └── user-routes.ts
│   │   ├── utils
│   │   │   ├── constants.ts
│   │   │   ├── token-manager.ts
│   │   │   └── validators.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/hg9336099029/MERN-GPT.git
   cd MERN-GPT
   ```

2. Install dependencies for both client and server:
   ```sh
   cd clients
   npm install
   cd ../server
   npm install
   ```

3. Create a `.env` file in both `clients` and `server` directories with the following content:

**For `clients/.env`:**
   ```sh
   VITE_REACT_APP_BACKEND_BASE_URL=http://localhost:5000
   ```

**For `server/.env`:**
   ```sh
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   COOKIE_SECRET=your_cookie_secret
   GEMINI_API_KEY=your_gemini_api_key
   FRONTEND_URL=http://localhost:5173
   ```

## Usage

1. Start the server:
   ```sh
   cd server
   npm run dev
   ```

2. Start the client:
   ```sh
   cd clients
   npm run dev
   ```

3. Open your browser and navigate to:
   ```sh
   http://localhost:5173
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
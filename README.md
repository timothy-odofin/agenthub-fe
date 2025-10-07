# 🤖 BotMate – AI Chat Application (React + Tailwind)

BotMate is a **modern AI chat interface** built with **React, TailwindCSS, and ShadCN UI**.  
It provides a seamless **login/register system**, a **multi-chat experience**, and a clean **responsive design** for interacting with an AI assistant.

---

## ✨ Features

### 🔐 Authentication
- **Login Page**: Minimal, clean design for user login.  
- **Register Page**: Form validation (email, password, confirm password).  
- **Google OAuth button (UI only)** to simulate third-party sign-in.  
- **Form validation** with helpful error messages.

### 💬 Chat System
- **Home Page** includes:
  - Sidebar for switching between multiple conversations.
  - Chat window with messages (user + AI assistant).
  - Simulated **AI responses** with typing delay (dummy data).
  - Option to start a new chat.
  - Model selector (Botmate, Botmate 2.0, Botmate Pro).
  - **Share button** (appears after messages are exchanged).

### 🎨 User Experience
- Built with **TailwindCSS** and **ShadCN UI components**.
- **Responsive layout** for both desktop and mobile.
- **Auto-resizing input field** in chat.
- **Branding with logo** and consistent theme colors.

---

## 🛠️ Tech Stack

- **React 18**
- **Tailwind CSS**
- **ShadCN UI** (Sidebar, Button, Select, Separator)
- **lucide-react** (icons)
- **React Router DOM** (for navigation between login/register/home)

---

## 📂 Project Structure

agenthub/
├── public/
│   └── index.html
├── src/
│   ├── assets/                # Images, logos, etc.
│   ├── components/            # Reusable UI components
│   │   ├── AppSidebar.jsx
│   │   ├── AppMessage.jsx
│   │   ├── ChatArea.jsx
│   │   ├── InputArea.jsx
│   │   └── ui/
│   │       ├── sidebar.jsx    # ShadCN sidebar components
│   │       ├── separator.jsx
│   │       └── ...            
│   ├── data/                  # Static/dummy data
│   │   └── chats.js
│   ├── lib/                   # Utilities/helpers
│   │   └── utils.js
│   ├── pages/                 # Route-level components
│   │   ├── Home.jsx
│   │   └── auth/
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   ├── routes/                # Route definitions
│   │   └── index.jsx
│   ├── App.jsx                # Main layout (sidebar + content)
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind & global styles
├── package.json
└── README.md




##  Quick Start (Windows)
1. Node 18+ recommended
2. Clone and install:
   npm install
3. Run dev server:
   npm run dev
4. Open browser:
   http://localhost:5173

Common scripts (if using Vite):
- npm run dev
- npm run build
- npm run preview

## Layout Notes / Tips
- Sidebar should be wrapped in a fixed-width container (e.g., `w-64 flex-shrink-0`).
- Main content must use `flex-1 min-w-0` so it expands to remaining width and internal scroll works correctly.
- ChatArea root should use `h-full min-h-0` and message list `flex-1 overflow-y-auto` so only messages scroll.

## Development Guidance
- Keep hooks imports explicit: React, useState, useEffect, useRef where used.
- When using Radix Slot / asChild, ensure a single React element child.
- Capture chatId for async updates to avoid race conditions when active chat changes.

## Contributing
- Open issues for bugs or layout problems.
- Send PRs with focused changes and a short description.

## License
MIT — see LICENSE file.


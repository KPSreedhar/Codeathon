# 🏆 Codeathon 2026 — Fix the Code Contest

> **Live Demo:** [https://codeathoncontest.netlify.app](https://codeathoncontest.netlify.app)

A fast-paced, browser-based coding contest platform built with **React + Vite**. Students register, then race against a 15-minute countdown to fix 10 code snippets across C, C++, and Java — all by dragging the correct tokens into blank slots.

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Landing page with Register & Play CTAs |
| Register | `/register` | Student registration form |
| Round 1 Lobby | `/round1` | Rules overview before the game starts |
| Game | `/round1/game` | The 15-minute drag-and-drop quiz |

---

## ✨ Features

- 🔐 **Registration gate** — players must register before accessing the game; unregistered users are redirected automatically
- ⏱ **Live countdown timer** — 15 minutes, starts the moment the game loads (not the lobby); turns red in the final minute
- 🖱 **Drag-and-drop answers** — drag code tokens into blank slots inside real-looking code blocks
- 👆 **Click-to-fill** — tap an option to auto-fill the next empty slot (mobile friendly)
- 🗑 **Click-to-clear** — click a filled slot to remove the answer and try again
- 📊 **Progress bar** — shows how far through the 10 questions the player is
- 🏅 **Score screen** — displays final score (out of 10), player name, and correct answer count
- 🔄 **Auto-redirect** — already-registered users skip the register page and go straight to the lobby
- 📱 **Responsive design** — works on mobile, tablet, and desktop

---

## 🧩 Questions

10 fill-in-the-blank code questions covering:

| # | Language | Topic |
|---|---|---|
| 1 | C | Correct `#include` header for `printf` |
| 2 | C | `for` loop condition |
| 3 | C | Equality comparison operator |
| 4 | C++ | Main function return type |
| 5 | C++ | `#include` header for `std::cout` |
| 6 | C++ | `while` loop condition |
| 7 | Java | Main method return type |
| 8 | Java | Greater-than comparison |
| 9 | Java | Addition operator |
| 10 | C | Logical AND operator |

Each correct answer scores **1 point**. Maximum score: **10 / 10**.

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 7](https://vitejs.dev) | Build tool & dev server |
| [React Router v7](https://reactrouter.com) | Client-side routing |
| CSS (vanilla) | Styling — no CSS framework |
| localStorage | Persisting registration data & timer start time |
| Netlify | Hosting & CI/CD |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js `>= 20`
- npm `>= 8`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/codeathon.git
cd codeathon

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
codeathon/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Fixed top navbar with user info & logout
│   ├── pages/
│   │   ├── Home.jsx            # Landing / hero page
│   │   ├── Register.jsx        # Student registration form
│   │   ├── LandingPage1.jsx    # Round 1 lobby / rules
│   │   └── GamePage.jsx        # Main quiz game
│   ├── styles/
│   │   ├── Hero.css
│   │   ├── Navbar.css
│   │   ├── Register.css
│   │   └── RoundOne.css
│   ├── App.jsx                 # Route definitions
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔒 How Registration Works

1. Player fills in **Name**, **Class/Year**, and **10-digit Mobile Number**
2. Data is saved to `localStorage` as `studentData`
3. If already registered, the register page redirects to the Round 1 lobby
4. The game page checks for registration on load — unregistered users are sent to `/register`
5. Logging out clears `localStorage` and returns to the home page

---

## ⚙️ Deploying to Netlify

1. Push the project to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from GitHub**
3. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy** — Netlify auto-deploys on every future push to `main`

---

## 📄 License

This project was built for educational and contest purposes.  
Feel free to fork, modify, and use it for your own coding events.

---

*Built with ❤️ for Codeathon 2026*

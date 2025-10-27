# Expense Tracker

This repository contains a small expense tracker app with a Node/Express backend and a React frontend.

Quick overview
- `backend/`: Express API, MongoDB models, and an email service
- `frontend/`: React app that talks to the backend

Prerequisites
- Node.js 18+ and npm
- A running MongoDB instance or MongoDB Atlas connection string

1) Backend — setup and run

- Change to the backend folder and install dependencies:

```bash
cd backend
npm install
```

- Create a `.env` file based on `backend/.env.example` (do NOT commit `.env`):

```bash
cp .env.example .env
# edit .env to add your real values
```

- Start the backend:

```bash
npm start
```

- Development (auto-reload):

```bash
npm run dev
```

- Health check (after server is running):

GET http://localhost:5000/api/health

2) Frontend — setup and run

- Change to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

- Create a `.env` file if you need to override the API URL (optional). Example variable is `REACT_APP_API_URL`.

- Start the frontend:

```bash
npm start
```

3) Environment variables and secrets

- Keep secrets out of the repository. Use `.env` locally and never commit it. The repo includes `backend/.env.example` to show required variables.
- If a secret was committed by accident, rotate the secret immediately and remove it from git history.

4) Useful git notes

- There's a top-level `.gitignore` which excludes `node_modules` and `.env` files.
- If you ever need to remove secrets from history, tools like `git filter-repo` or `git filter-branch` can help — but be cautious (rewrites history).

5) Troubleshooting

- If the backend fails to start check:
  - `backend/.env` has `MONGODB_URI` set and reachable
  - Port conflicts (defaults to 5000)

- If the frontend cannot talk to the backend, ensure the frontend's API URL matches the backend address and CORS is enabled on the backend.

6) Contact / Next steps

- To add deployment instructions or Docker support, create a follow-up ticket or ask me to add them.

Enjoy!

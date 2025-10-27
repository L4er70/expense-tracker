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

7) Testing & example environment variables (recommended for team)

Below are concrete example `.env` values your teammates can copy for local testing. These examples are safe placeholders — replace the values with real credentials for your environment.

Backend example (create `backend/.env` from `backend/.env.example`):

```bash
# Use a local MongoDB for quick local testing
MONGODB_URI=mongodb://localhost:27017/expense-tracker-test

# Server port
PORT=5000

# For email notifications during local testing you can use a testing SMTP provider like Mailtrap
# or use Sendinblue relay placeholder values below.
SMTP_HOST=smtp-relay.sendinblue.com
SMTP_PORT=587
SMTP_USER=test_smtp_user
SMTP_PASS=test_smtp_pass

EMAIL_FROM=dev@example.com
EMAIL_TO=dev-recipient@example.com
```

Notes:
- If you don't want to send real emails during development, set `EMAIL_TO` to your own test inbox or
  configure a local SMTP capture tool like MailHog or Mailtrap.
- For CI or shared team environments, use environment variables in the CI service rather than committing `.env`.

Frontend example (create `frontend/.env` or set locally):

```bash
# Point the frontend at the locally running backend
REACT_APP_API_URL=http://localhost:5000/api
```

How teammates should get started (quick checklist):

1. Clone the repo:

```bash
git clone https://github.com/L4er70/expense-tracker.git
cd expense-tracker
```

2. Backend:

```bash
cd backend
cp .env.example .env   # edit values (MONGODB_URI, SMTP_*)
npm install
npm start
```

3. Frontend (in a new terminal):

```bash
cd frontend
cp .env.example .env || printf "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm install
npm start
```

4. Verify backend health endpoint: GET http://localhost:5000/api/health

If your team wants, I can also add a Docker Compose file that brings up MongoDB, backend, and a dev SMTP service (MailHog) for one-command local testing — say the word and I'll add it.

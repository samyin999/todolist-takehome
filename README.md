# Todo App

A full-stack todo application built as a take-home technical test.

## Stack

- **Next.js 15** — full-stack framework (frontend + API routes)
- **Prisma 7** with SQLite — database ORM
- **Tailwind CSS** — styling
- **Vitest** — testing

## Setup

```bash
# 1. Enter the project directory
cd todo-app

# 2. Install dependencies
npm install

# 3. Set up the database
npx prisma migrate dev

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running tests

```bash
cd todo-app
npm test
```

## Features

- Create, edit, and delete todos and categories
- Assign a category to each todo
- Mark todos complete or incomplete
- Overdue indicator for overdue incomplete todos
- CSV export of all todos

## Notes

- The `.env` file is included in the repo since it only contains a local SQLite path, no secrets
- UI polish was kept minimal as my priority was mainly task completion

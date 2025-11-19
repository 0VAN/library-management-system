# Task Management system (Rails API + React TS)

This project provides a Ruby on Rails API for managing user tasks and a React + TypeScript frontend for interacting with the service.

## Backend (Ruby on Rails)
- API-only Rails 7 application under `backend/`
- CRUD for tasks with `title`, `description`, `status`, `due_date`, and `user_id`
- Filtering by `user_id` via query param on the index endpoint

### Running the API
```bash
cd backend
bundle install
bin/rails db:create db:migrate db:seed
bin/rails server
```

The API will be available at `http://localhost:3000/api/tasks`.

## Frontend (React + TypeScript)
- Vite-based React client under `frontend/`
- Simple UI to create, edit, delete, and list tasks
- Proxies API requests to the Rails server at `localhost:3000`

### Running the client
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to use the interface.

## API Routes
- `GET /api/tasks` (optional `user_id` query)
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

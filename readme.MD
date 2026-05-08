# AgriConnect KH — API

REST API for the AgriConnect KH platform, built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL** (Sequelize ORM).

---

## Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Runtime      | Node.js                           |
| Language     | TypeScript                        |
| Framework    | Express 5                         |
| Database     | PostgreSQL + Sequelize 6          |
| Auth         | JWT + bcrypt                      |
| Logging      | Winston                           |
| API Docs     | Swagger (swagger-jsdoc + swagger-ui-express) |
| Dev Runner   | tsx (watch mode)                  |

---

## Project Structure

```
agriconnect_api/
├── logs/
│   └── app.log                      # Winston log output
│
├── src/
│   ├── config/
│   │   ├── database.ts              # Sequelize instance
│   │   ├── mail.ts                  # Nodemailer config
│   │   └── swagger.ts               # Swagger/OpenAPI setup
│   │
│   ├── constants/                   # Shared constants
│   │
│   ├── database/
│   │   ├── config.cjs               # Sequelize CLI config (CommonJS)
│   │   ├── migrator.ts              # Programmatic migration runner
│   │   ├── runMigrations.ts         # Migration entry point
│   │   ├── runSeeders.ts            # Seeder entry point
│   │   ├── seeder.ts                # Programmatic seeder runner
│   │   ├── migrations/
│   │   │   ├── 20260506060805-create-roles.ts
│   │   │   └── 20260506064850-create-users.ts
│   │   ├── models/
│   │   │   └── index.ts             # Sequelize model registry
│   │   └── seeders/
│   │       ├── 20260506061004-seed-roles.ts
│   │       └── 20260506064909-seed-users.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts       # JWT verification middleware
│   │   ├── error.middleware.ts      # Global error handler
│   │   ├── logger.middleware.ts     # HTTP request logger
│   │   └── validate.ts             # Request validation middleware
│   │
│   ├── modules/                     # Feature-based modules
│   │   ├── auth/
│   │   │   ├── auth.controller.ts   # Request handlers
│   │   │   ├── auth.email.ts        # Auth email templates & sender
│   │   │   ├── auth.repository.ts   # Database access layer
│   │   │   ├── auth.routes.ts       # Route definitions
│   │   │   ├── auth.service.ts      # Business logic
│   │   │   ├── auth.validation.ts   # Joi/Zod request schemas
│   │   │   ├── user.dto.ts          # User data transfer objects
│   │   │   └── user.model.ts        # Sequelize User model
│   │   │
│   │   ├── org/                     # Organization module (in progress)
│   │   │
│   │   └── role/
│   │       └── role.model.ts        # Sequelize Role model
│   │
│   ├── types/
│   │   ├── api-response.ts          # Shared API response types
│   │   └── express.d.ts             # Express Request type augmentation
│   │
│   ├── utils/
│   │   ├── app-error.ts             # Custom AppError class
│   │   ├── async-handler.ts         # Async route wrapper
│   │   ├── generate-token.ts        # JWT token generator
│   │   ├── logger.ts                # Winston logger instance
│   │   └── response-builder.ts      # Standardized API response builder
│   │
│   ├── app.ts                       # Express app setup & middleware
│   └── server.ts                    # Entry point — DB connect & listen
│
├── .env                             # Environment variables (not committed)
├── .sequelizerc                     # Sequelize CLI path config
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL running locally (or a remote instance)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agriconnect
DB_USER=postgres
DB_PASS=yourpassword
JWT_SECRET=your_jwt_secret
```

### Run in Development

```bash
npm run dev
```

Uses `tsx --watch` for hot reload. No build step needed.

### Build for Production

```bash
npm run build    # outputs to dist/
npm start        # runs dist/server.js
```

## API Documentation

Swagger UI is available at:

```
http://localhost:3000/docs
```

---

## Database (Sequelize CLI)

```bash
# Run migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo

# Run seeders
npx sequelize-cli db:seed:all

# Reset migration
npx sequelize-cli db:migrate:undo:all
```

Sequelize CLI paths are configured in `.sequelizerc`:
- Config: `src/config/database.json`
- Models: `database/models/`
- Migrations: `database/migrations/`
- Seeders: `database/seeders/`

---

## Scripts

| Script        | Description                        |
|---------------|------------------------------------|
| `npm run dev` | Start dev server with hot reload   |
| `npm run build` | Compile TypeScript to `dist/`    |
| `npm start`   | Run compiled production build      |

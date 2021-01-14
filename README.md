# Express App Template

This template is aimed at projects that only need a basic front-end and a basic back-end (**No front-end frameworks, No RESTful API endpoints, No JsonWebTokens**).
Basic, but useful Express JS starter app template. This template includes express, express-session, morgan, nunjucks as the templating engine, prettier as the formater, and Prisma as the ORM.

## Contains

- Useful packages:
  - Express
  - Express session
  - Morgan
  - Body parser
- ORM:
  - [Prisma 2](https://www.prisma.io)
- View engine:
  - [Nunjucks](https://mozilla.github.io/nunjucks/)
- Development packages:
  - Nodemon

## Scritps

- Executes nodemon

```bash
  npm run dev
```

- Executes prettier

```bash
  npm run format
```

## Setup and configuration

Prisma is configured (in this template) to use a SQLite3 database and Express Session needs a session name and a session secret, create a .env file at the root of the project and put the follwing content on it:

```py
DATABASE_URL="file:./app.db"
SESSION_NAME="appName"
SESSION_SECRET="secret"
```
Prisma needs one command to be fully functional ([Prisma Docs](https://www.prisma.io/docs)).
```bash
npx prisma migrate dev --name init --preview-feature
```

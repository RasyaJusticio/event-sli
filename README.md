# Event SLI

## Description

Event SLI is a social live interaction platform designed for events.

## Tech Stack

- Next.js
- Prisma
- Tailwind CSS
- TypeScript
- tRPC

### Notable Libraries

- React Hook Form
- TanStack Query
- Zod

## Quick Start

### Prerequisites

- Node.js 18+
- PNPM

### Installation

```bash
# Clone the repository
git clone https://github.com/RasyaJusticio/event-sli.git

# Enter the project directory
cd event-sli

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env

# Start the development server
pnpm dev
```

## Environment Variables

The following environment variables are required. Refer to `.env.example` for additional details.

```env
JWT_SECRET=
ADMIN_SECRET=
DATABASE_URL=
```

## Development

Start the development server:

```bash
pnpm run dev
```

Build the application:

```bash
pnpm run build
```

Start the production server:

```bash
pnpm run start
```

## Docker

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Routes

### Public Routes

| Route       | Description                                      |
| ----------- | ------------------------------------------------ |
| `/`         | Submit messages to be displayed during the event |
| `/led/main` | Main LED display showing approved messages       |
| `/led/side` | Secondary LED display for side screens           |

### Admin Routes

| Route               | Description                           |
| ------------------- | ------------------------------------- |
| `/admin/login`      | Administrator login                   |
| `/admin/moderation` | Review and approve submitted messages |

### API Routes

| Route         | Description                               |
| ------------- | ----------------------------------------- |
| `/api/trpc/*` | Application API endpoints powered by tRPC |

## Credits

Developed by [RasyaJusticio](https://github.com/rasyajusticio).

## License

This project is licensed under [GNU AGPLv3](./LICENSE)

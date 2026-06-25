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

## Project Story

This project was built under an extremely tight deadline for a live event.

The initial request arrived in the morning, and the system was expected to be operational the same night. The primary goal was straightforward: allow event participants to submit messages, have moderators review them, and display approved messages on LED screens during the event.

Given the time constraints, the focus was on delivering a reliable end-to-end workflow rather than building a feature-complete platform. The resulting system successfully supported message submission, moderation, and real-time display throughout the event.

There are many areas that could be improved and expanded in future iterations, but the project achieved its purpose: providing a working solution when it was needed most.

## Credits

Developed by [RasyaJusticio](https://github.com/rasyajusticio).

## License

This project is licensed under [GNU AGPLv3](./LICENSE)

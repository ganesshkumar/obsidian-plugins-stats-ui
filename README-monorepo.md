# Obsidian Ratings & Reviews (Turbo monorepo)

A **turborepo** monorepo for an Obsidian plugin ratings and reviews system.

## Structure

```
.
├─ apps/
│  ├─ store/             # Obsidian plugin (TypeScript)
│  └─ backend/           # NestJS API server
├─ packages/
│  └─ store/             # Shared Prisma client + repository helpers
├─ prisma/
│  └─ schema.prisma      # Database schema with existing Plugin model + new models
├─ turbo.json
├─ package.json
└─ README.md
```

## Features

- **Turborepo** setup with yarn workspaces
- **Shared Prisma package** (`@mono/store`) with MongoDB models
- **NestJS API backend** with Google OAuth authentication
- **Obsidian plugin** for rating and reviewing installed plugins
- **Type-safe** development with TypeScript throughout

## Database Models

The existing `Plugin` model is preserved, with new models added:

- `User` - User accounts with Google OAuth integration and pseudonames
- `Review` - Plugin reviews with ratings (1-5) and optional text
- `RatingAggregate` - Cached aggregates for fast plugin rating display

## Quick Start

### Prerequisites

- Node.js 20.x
- MongoDB database
- Google OAuth credentials

### Installation

```bash
yarn install
```

### Environment Variables

Create `.env` files as needed:

```bash
# Database
DATABASE_URL=mongodb+srv://...

# Authentication
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OAUTH_REDIRECT_ORIGIN=http://localhost:4000
OBSIDIAN_DEEP_LINK=obsidian://obsidian-plugin-store/auth/callback
```

### Development

```bash
# Start all apps in development mode
yarn dev

# Or run specific apps
yarn turbo run dev --filter="backend"
yarn turbo run dev --filter="@mono/store"
```

### Building

```bash
# Build all packages and apps
yarn build

# Build specific packages
yarn turbo run build --filter="@mono/store"
```

## API Endpoints

### Authentication
- `POST /v1/auth/start` - Start Google OAuth flow
- `GET /v1/auth/google/callback` - OAuth callback handler
- `POST /v1/me/pseudoname` - Set user pseudoname

### Reviews
- `POST /v1/plugins/lookup` - Get plugin data with ratings
- `GET /v1/plugins/:pluginId/:version/reviews` - Paginated reviews
- `POST /v1/reviews` - Create/update review

## Obsidian Plugin

The Obsidian plugin provides:

- Commands for login and rating plugins
- Integration with system browser for OAuth
- Deep link handling for auth callbacks
- Plugin settings persistence

To use in Obsidian:
1. Copy `apps/store/dist/` contents to your Obsidian plugins folder
2. Enable the plugin in Obsidian settings
3. Use commands to login and rate plugins

## Legacy Support

The original Next.js application functionality is preserved through legacy scripts:

```bash
yarn legacy:dev      # Start the original Next.js app
yarn legacy:build    # Build the original Next.js app
```

## Development Commands

```bash
# Root level
yarn dev             # Run all apps in parallel
yarn build           # Build all apps and packages
yarn lint            # Run linting across all packages
yarn format          # Format code with prettier

# Individual apps
cd apps/backend && yarn dev     # NestJS development server
cd apps/store && yarn dev       # TypeScript watch mode
cd packages/store && yarn dev   # Shared package watch mode
```

## Authentication Flow

1. Plugin calls `POST /v1/auth/start` → backend returns Google OAuth URL
2. Plugin opens external browser to OAuth URL
3. User completes Google OAuth → backend creates/updates User record
4. Backend redirects to `obsidian://` deep link with JWT token
5. Plugin receives token and stores it for API calls

## Contributing

This monorepo uses:
- **Turborepo** for build orchestration
- **Yarn workspaces** for dependency management
- **TypeScript** for type safety
- **Prisma** for database access
- **MongoDB** for data storage

All packages share the same TypeScript configuration and tooling setup.
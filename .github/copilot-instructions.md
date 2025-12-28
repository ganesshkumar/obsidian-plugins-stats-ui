# GitHub Copilot Instructions for Obsidian Stats

## Project Overview

Obsidian Stats is a Next.js web application that provides analytics, statistics, and discovery features for the Obsidian plugin and theme ecosystem. The application helps users track trending plugins, new releases, favorites, and provides various tools for plugin comparison and scoring.

**Live Site:** https://www.obsidianstats.com

## Tech Stack

### Core Framework

- **Next.js 15** with Pages Router (not App Router)
- **React 19** with TypeScript
- **Prisma ORM** with MongoDB database

### Styling

- **Tailwind CSS 4** for utility-first styling
- **shadcn/ui** components (New York style) in `components/ui/` (Prefer these over flowbite react for new components)
- **Flowbite React** for UI component library
- **Framer Motion** for animations

### State Management

- **Zustand** for global state management (see `store/` directory)
- **TanStack React Query** for server state and data fetching

### Testing

- **Jest** with React Testing Library
- Test files are co-located with components using `.test.tsx` suffix

### Authentication

- Custom OAuth implementation with JWT tokens
- Auth utilities in `lib/auth.ts`
- `useAuth` hook for authentication state

## Project Structure

```
├── pages/              # Next.js pages (Pages Router)
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── home/          # Homepage-specific components
│   ├── plugins/       # Plugin-related components
│   ├── post/          # Blog post components
│   └── ...            # Feature components
├── domain/            # Domain models and business logic
│   ├── plugins/       # Plugin-related domain logic
│   ├── themes/        # Theme-related domain logic
│   └── scorer/        # Custom scoring logic
├── lib/               # Utilities and shared logic
│   ├── analytics/     # Analytics integration
│   ├── contexts/      # React contexts
│   └── providers/     # React providers
├── hooks/             # Custom React hooks
├── store/             # Zustand stores
├── cache/             # Caching utilities
├── prisma/            # Prisma schema and migrations
├── data/              # Static data files
├── posts/             # Markdown blog posts
├── utils/             # Utility functions
└── styles/            # Global styles
```

## Coding Conventions

### TypeScript

- Use TypeScript for all new code
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Follow existing naming conventions: `I` prefix for interfaces (e.g., `IHeaderProps`)

### React Components

- Use functional components with hooks
- Co-locate test files with components (e.g., `Component.tsx` and `Component.test.tsx`)
- Use named exports for components when appropriate
- Props interfaces should be named `I{ComponentName}Props`

### Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme: violet/purple for primary accents
- Use `className` prop with template literals for conditional classes
- Use `clsx` or `tailwind-merge` for complex class composition

### State Management

- Use Zustand for global client-side state
- Use React Query for server state and API calls
- Use React Context for dependency injection (auth, user context)

### Testing

- Write tests for all new components
- Use React Testing Library's user-centric queries
- Mock Prisma client in tests
- Use `moment` for date manipulation in tests

## Database Schema (Prisma/MongoDB)

Key models:

- `Plugin` - Obsidian plugin metadata with stats (downloads, stars, forks, etc.)
- `Theme` - Obsidian theme metadata
- Scoring fields: `score`, `healthScore`, `popularityScore`, `zScoreTrending`

## Common Patterns

### Data Fetching

```tsx
// Use getStaticProps or getServerSideProps for page data
export const getStaticProps: GetStaticProps = async () => {
  const plugins = await PluginsCache.get();
  return { props: { plugins }, revalidate: 3600 };
};
```

### Component Structure

```tsx
interface IComponentProps {
  plugin: Plugin;
  showDescription?: boolean;
}

const Component = ({ plugin, showDescription }: IComponentProps) => {
  return <div className="...">{/* Component content */}</div>;
};

export default Component;
```

### Zustand Store

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IStoreState {
  value: string;
  setValue: (value: string) => void;
}

export const useStore = create<IStoreState>()(
  persist(
    (set) => ({
      value: '',
      setValue: (value) => set({ value }),
    }),
    { name: 'store-name' }
  )
);
```

### Authenticated API Calls

```tsx
import { authenticatedFetch } from '@/lib/api';

const response = await authenticatedFetch('/api/endpoint', {
  method: 'POST',
  body: JSON.stringify(data),
});
```

## Import Aliases

Use the `@/` alias for imports:

- `@/components` - Components
- `@/lib` - Library utilities
- `@/hooks` - Custom hooks
- `@/utils` - Utility functions

## Key Features to Understand

1. **Plugin Discovery** - New plugins, trending, most downloaded
2. **Favorites** - User can favorite plugins and track updates
3. **Custom Scoring** - Users can create custom scoring functions
4. **Themes** - Similar features for Obsidian themes
5. **Blog/Posts** - Markdown-based blog with weekly updates

## Commands

```bash
npm run dev          # Start development server on port 5000
npm run build        # Build for production
npm run test         # Run Jest tests
npm run prettier     # Format code
```

## Environment Variables

Required environment variables:

- `DATABASE_URL` - MongoDB connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL (for auth)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

## Best Practices

1. **Performance**: Use React Query for caching, implement proper loading states
2. **Accessibility**: Use semantic HTML, proper ARIA attributes
3. **SEO**: Include proper meta tags, use Next.js Head component
4. **Error Handling**: Implement proper error boundaries and fallbacks
5. **Type Safety**: Leverage Prisma types for database models

## Common Gotchas

- The project uses Pages Router, not App Router
- Prisma client is generated at build time (`postinstall` script)
- Use `moment` for date formatting (already in the codebase)
- shadcn/ui components are in `components/ui/` - don't regenerate existing ones
- Flowbite and shadcn components coexist - prefer shadcn for new components

## When Adding New Features

1. Create component in appropriate directory
2. Add corresponding test file
3. Use existing patterns for state management and styling
4. Update types/interfaces as needed
5. Add proper TypeScript types for all props and state

# Obsidian Stats

Stay informed about the Obsidian plugin ecosystem with Obsidian Stats! Whether you're tracking trending plugins, new releases, or your personal favorites, we've got you covered.

![Obsidian Stats](https://user-images.githubusercontent.com/2135089/154796362-e80a56b4-1f0f-451b-8bf3-3ed435c6b23f.png)
![Maintainability](https://img.shields.io/codeclimate/maintainability-percentage/ganesshkumar/obsidian-plugins-stats-ui)
![Code Issues](https://img.shields.io/codeclimate/issues/ganesshkumar/obsidian-plugins-stats-ui?label=code%3Aissues)
![Tech Debt](https://img.shields.io/codeclimate/tech-debt/ganesshkumar/obsidian-plugins-stats-ui)

[![Tag 0.1.0](https://img.shields.io/badge/tag-0.1.0-blue)](https://github.com/ganesshkumar/obsidian-plugins-stats-ui)
[![MIT License](https://img.shields.io/github/license/ganesshkumar/obsidian-plugins-stats-ui)](LICENSE)

## Features

Explore [Obsidian](https://obsidian.md) plugins with these powerful features:

- **[New Plugins](https://www.obsidianstats.com/new)** – Discover plugins released in the past 10 days.
- **[Latest Updates](https://www.obsidianstats.com/updates)** – Stay up to date with the latest releases and changelogs.
- **[Trending Plugins](https://www.obsidianstats.com/trending)** – Check out the top 10 trending plugins based on downloads and engagement.
- **[Most Downloaded](https://obsidianstats.com/most-downloaded)** – View the most downloaded plugins over last week, last month and overall timeline.
- **[Favorites](https://www.obsidianstats.com/favorites)** – Track your favorite plugins and get notified of new updates.
- **[Plugin Sharing](https://obsidianstats.com/share)** – Compare and share plugin lists with others.
- **[Migration Guide](https://www.obsidianstats.com/migrate)** – Export and import your favorite plugin lists across devices.
- **[Scoring System](https://www.obsidianstats.com/scorer)** – Build custom scoring functions to rank plugins based on your criteria.
- **[Tags](https://www.obsidianstats.com/tags)** – Browse plugins by tags to find exactly what you need.
- **[Share](https://www.obsidianstats.com/share)** – Share your favorite plugin lists with the community.

## Screenshots

## Docker Deployment

Run Obsidian Stats in a Docker container with minimal image size (~50-100MB).

### Prerequisites

- Docker installed on your system
- A `.env` file with required environment variables

### Build the Docker Image

The Dockerfile accepts `DATABASE_URL` as a build argument, which is required for Prisma to generate the client during the build phase.

**PowerShell (Windows):**

```powershell
docker build --build-arg DATABASE_URL="your_mongodb_connection_string" -t obsidian-plugins-stats .
```

**Bash (Linux/Mac):**

```bash
docker build --build-arg DATABASE_URL="your_mongodb_connection_string" -t obsidian-plugins-stats .
```

**Load from .env file (PowerShell):**

```powershell
$DATABASE_URL = (Get-Content .env | Select-String -Pattern '^DATABASE_URL=').ToString().Split('=', 2)[1]
docker build --build-arg DATABASE_URL="$DATABASE_URL" -t obsidian-plugins-stats .
```

### Run with Environment File

```bash
docker run -p 3000:3000 --env-file .env obsidian-plugins-stats
```

### Using Docker Compose

For easier management, use Docker Compose:

```bash
docker-compose up -d
```

To stop the container:

```bash
docker-compose down
```

### Environment Variables

Create a `.env` file in the project root with your configuration:

```env
DATABASE_URL="your_database_url"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_key"
# Add other required environment variables
```

### Access the Application

Once running, access the application at `http://localhost:3000`

## License

[MIT](LICENSE)

---

If you find this tool useful, consider supporting me with a coffee! ☕  
<a href="https://www.buymeacoffee.com/ganesshkumar" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

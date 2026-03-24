# GitCards Pro

Dynamic SVG cards for GitHub profiles.

## Local Development

```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`

## Deployment (Vercel)

1. Push repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy"

No environment variables required.

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/activity` | Activity stats with bar graph |
| `/api/streak` | Contribution streak with circular progress |
| `/api/growth` | Stars and repos growth over time |
| `/api/tech` | Top languages and tech stack |
| `/api/repo` | Featured repository card |

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `username` | Yes | GitHub username |
| `theme` | No | `dark` (default), `light`, `neon`, `ocean`, `sunset` |
| `repo` | No | Repository name (for `/api/repo` only) |

## Usage in GitHub README

```markdown
![Activity](https://YOUR-DOMAIN.vercel.app/api/activity?username=YOUR_USERNAME)

![Streak](https://YOUR-DOMAIN.vercel.app/api/streak?username=YOUR_USERNAME&theme=neon)

![Growth](https://YOUR-DOMAIN.vercel.app/api/growth?username=YOUR_USERNAME&theme=ocean)

![Tech](https://YOUR-DOMAIN.vercel.app/api/tech?username=YOUR_USERNAME)

![Repo](https://YOUR-DOMAIN.vercel.app/api/repo?username=YOUR_USERNAME&repo=REPO_NAME)
```

## Project Structure

```
/app/api/          API route handlers
/cards/            SVG card generators
/lib/              Shared utilities
  github.ts        GitHub API client
  theme.ts         Theme configuration
  utils.ts         SVG helpers
```

## Adding New Cards

1. Create card renderer in `/cards/newcard.ts`
2. Create route handler in `/app/api/newcard/route.ts`
3. Import theme and GitHub utilities as needed

## Cache

Responses are cached for 1 hour via `Cache-Control` headers.

## Rate Limits

GitHub API allows 60 requests/hour for unauthenticated requests. For higher limits, add a GitHub token to the fetch headers in `/lib/github.ts`.

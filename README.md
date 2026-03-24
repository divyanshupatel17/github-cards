# GitHub Cards

Dynamic SVG cards for GitHub profiles. Server-side rendered, zero JavaScript, instant embed.

## Preview

### All Cards Combined
![All Cards](https://github-cards-dun-six.vercel.app/api/all?username=divyanshupatel17)

### Individual Cards

| Activity | Streak |
|----------|--------|
| ![Activity](https://github-cards-dun-six.vercel.app/api/activity?username=divyanshupatel17) | ![Streak](https://github-cards-dun-six.vercel.app/api/streak?username=divyanshupatel17) |

| Growth | Tech Stack |
|--------|------------|
| ![Growth](https://github-cards-dun-six.vercel.app/api/growth?username=divyanshupatel17) | ![Tech](https://github-cards-dun-six.vercel.app/api/tech?username=divyanshupatel17) |

| Featured Repository |
|---------------------|
| ![Repo](https://github-cards-dun-six.vercel.app/api/repo?username=divyanshupatel17) |

## Usage

Replace `YOUR_USERNAME` with your GitHub username.

### All Cards (Combined View)
```markdown
![GitHub Stats](https://github-cards-dun-six.vercel.app/api/all?username=YOUR_USERNAME)
```

### Activity Card
```markdown
![Activity](https://github-cards-dun-six.vercel.app/api/activity?username=YOUR_USERNAME)
```

### Streak Card
```markdown
![Streak](https://github-cards-dun-six.vercel.app/api/streak?username=YOUR_USERNAME)
```

### Growth Card
```markdown
![Growth](https://github-cards-dun-six.vercel.app/api/growth?username=YOUR_USERNAME)
```

### Tech Stack Card
```markdown
![Tech Stack](https://github-cards-dun-six.vercel.app/api/tech?username=YOUR_USERNAME)
```

### Featured Repo Card
```markdown
![Repo](https://github-cards-dun-six.vercel.app/api/repo?username=YOUR_USERNAME)
```

Specific repository:
```markdown
![Repo](https://github-cards-dun-six.vercel.app/api/repo?username=YOUR_USERNAME&repo=REPO_NAME)
```

## Themes

Add `&theme=THEME_NAME` to any endpoint.

| Theme | Preview |
|-------|---------|
| `dark` | Default dark theme |
| `light` | Light background |
| `neon` | Cyan/magenta glow |
| `ocean` | Deep blue/teal |
| `sunset` | Warm orange/gold |

Example with theme:
```markdown
![Activity](https://github-cards-dun-six.vercel.app/api/activity?username=YOUR_USERNAME&theme=neon)
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/all` | All cards combined |
| `/api/activity` | Activity stats with graphs |
| `/api/streak` | Contribution streak |
| `/api/growth` | Stars and repos growth |
| `/api/tech` | Top languages |
| `/api/repo` | Featured repository |

## Deploy Your Own

1. Fork this repository
2. Go to [vercel.com](https://vercel.com)
3. Import your fork
4. Deploy

No environment variables required.

## Local Development

```bash
npm install
npm run dev
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Server-side SVG rendering
- GitHub REST API

## License

MIT

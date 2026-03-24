# GitHub Cards

Dynamic SVG cards for GitHub profiles. Server-side rendered, zero JavaScript, instant embed.

## Preview

### Activity Card
![Activity](https://gitsense-cards.vercel.app/api/activity?username=divyanshupatel17)
```
https://gitsense-cards.vercel.app/api/activity?username=divyanshupatel17
```

### Streak Card
![Streak](https://gitsense-cards.vercel.app/api/streak?username=divyanshupatel17)
```
https://gitsense-cards.vercel.app/api/streak?username=divyanshupatel17
```

### Growth Card
![Growth](https://gitsense-cards.vercel.app/api/growth?username=divyanshupatel17)
```
https://gitsense-cards.vercel.app/api/growth?username=divyanshupatel17
```

### Tech Stack Card
![Tech](https://gitsense-cards.vercel.app/api/tech?username=divyanshupatel17)
```
https://gitsense-cards.vercel.app/api/tech?username=divyanshupatel17
```

### Featured Repo Card
![Repo](https://gitsense-cards.vercel.app/api/repo?username=divyanshupatel17)
```
https://gitsense-cards.vercel.app/api/repo?username=divyanshupatel17
```

### Stats Card
![Stats](https://gitsense-cards.vercel.app/api/stats?username=divyanshupatel17)
```
https://gitsense-cards.vercel.app/api/stats?username=divyanshupatel17
```

### Radar Card
![Radar](https://gitsense-cards.vercel.app/api/radar?username=divyanshupatel17)
```
https://gitsense-cards.vercel.app/api/radar?username=divyanshupatel17
```

### Heatmap Card
![Heatmap](https://gitsense-cards.vercel.app/api/heatmap?username=divyanshupatel17)
```
https://gitsense-cards.vercel.app/api/heatmap?username=divyanshupatel17
```

### All Cards Combined
![All](https://gitsense-cards.vercel.app/api/all?username=divyanshupatel17)
```
https://gitsense-cards.vercel.app/api/all?username=divyanshupatel17
```

## Usage

Replace `YOUR_USERNAME` with your GitHub username.

### Activity Card
```markdown
![Activity](https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME)
```

### Streak Card
```markdown
![Streak](https://gitsense-cards.vercel.app/api/streak?username=YOUR_USERNAME)
```

### Growth Card
```markdown
![Growth](https://gitsense-cards.vercel.app/api/growth?username=YOUR_USERNAME)
```

### Tech Stack Card
```markdown
![Tech Stack](https://gitsense-cards.vercel.app/api/tech?username=YOUR_USERNAME)
```

### Stats Card
```markdown
![Stats](https://gitsense-cards.vercel.app/api/stats?username=YOUR_USERNAME)
```

### Radar Card
```markdown
![Radar](https://gitsense-cards.vercel.app/api/radar?username=YOUR_USERNAME)
```

### Heatmap Card
```markdown
![Heatmap](https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME)
```

### Featured Repo Card
```markdown
![Repo](https://gitsense-cards.vercel.app/api/repo?username=YOUR_USERNAME)
```

Specific repository:
```markdown
![Repo](https://gitsense-cards.vercel.app/api/repo?username=YOUR_USERNAME&repo=REPO_NAME)
```

### All Cards Combined
```markdown
![All](https://gitsense-cards.vercel.app/api/all?username=YOUR_USERNAME)
```

## Themes

Add `&theme=THEME_NAME` to any endpoint.

| Theme | Style | Description |
|-------|-------|-------------|
| `dark` | Flat | Default dark theme |
| `light` | Flat | Light background |
| `neon` | Neon | Cyan/magenta glow effects |
| `glass` | Glass | Glassmorphism with transparency |
| `neumorphic` | Soft | Neumorphic soft shadows |
| `ocean` | Flat | Deep blue/teal colors |
| `sunset` | Flat | Warm orange/gold tones |
| `cyberpunk` | Neon | Yellow/pink cyberpunk style |

### Theme Examples

```markdown
![Activity](https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=neon)
![Activity](https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=glass)
![Activity](https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=cyberpunk)
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/activity` | Activity overview with weekly graphs |
| `/api/streak` | Contribution streak with circular progress |
| `/api/growth` | Stars and repos growth over time |
| `/api/tech` | Top languages with animated bars |
| `/api/stats` | GitHub stats summary with rank |
| `/api/radar` | Developer skills radar chart |
| `/api/heatmap` | Activity heatmap grid |
| `/api/repo` | Featured repository card |
| `/api/all` | All cards combined view |

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `username` | Yes | GitHub username |
| `theme` | No | Theme name (default: dark) |
| `repo` | No | Repository name (for /api/repo only) |

## Features

- Premium UI design with multiple visual styles
- Glassmorphism, neumorphism, and neon effects
- Smooth SVG animations
- Responsive and scalable
- Fast server-side rendering
- 1-hour cache for performance
- Zero JavaScript in output

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

Open `http://localhost:3000/api/activity?username=YOUR_USERNAME`

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Server-side SVG rendering
- GitHub REST API

## License

MIT

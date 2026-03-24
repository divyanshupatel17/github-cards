# GitHub Cards

Dynamic SVG cards for GitHub profiles. Server-side rendered, zero JavaScript, instant embed. Works with 8 beautiful themes and full animation support.

## Preview - All Cards

### Activity Card
![Activity](https://gitsense-cards.vercel.app/api/activity?username=divyanshupatel17)

### Streak Card
![Streak](https://gitsense-cards.vercel.app/api/streak?username=divyanshupatel17)

### Growth Card with Animated Graphs
![Growth](https://gitsense-cards.vercel.app/api/growth?username=divyanshupatel17)

### Tech Stack Card with Animated Bars
![Tech](https://gitsense-cards.vercel.app/api/tech?username=divyanshupatel17)

### Stats Card with Animated Rank
![Stats](https://gitsense-cards.vercel.app/api/stats?username=divyanshupatel17)

### Radar Card with Developer Skills
![Radar](https://gitsense-cards.vercel.app/api/radar?username=divyanshupatel17)

### Heatmap Card - Monthly View
![Heatmap](https://gitsense-cards.vercel.app/api/heatmap?username=divyanshupatel17&period=month)

### Featured Repository Card
![Repo](https://gitsense-cards.vercel.app/api/repo?username=divyanshupatel17)

### All Cards Combined
![All](https://gitsense-cards.vercel.app/api/all?username=divyanshupatel17)

## Usage

Replace `YOUR_USERNAME` with your GitHub username.

### Basic Usage - Add to Your README

```markdown
![Activity Card](https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME)

![Growth Card](https://gitsense-cards.vercel.app/api/growth?username=YOUR_USERNAME)

![Radar Card](https://gitsense-cards.vercel.app/api/radar?username=YOUR_USERNAME)

![Heatmap Card](https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&period=month)

![All Cards](https://gitsense-cards.vercel.app/api/all?username=YOUR_USERNAME&theme=dark)
```

### With Custom Themes

```markdown
![Activity - Neon](https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=neon)

![Growth - Ocean](https://gitsense-cards.vercel.app/api/growth?username=YOUR_USERNAME&theme=ocean)

![Radar - Sunset](https://gitsense-cards.vercel.app/api/radar?username=YOUR_USERNAME&theme=sunset)
```

### With Heatmap Periods

```markdown
<!-- Weekly heatmap -->
![Heatmap - Weekly](https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&period=week)

<!-- Monthly heatmap (default) -->
![Heatmap - Monthly](https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&period=month)

<!-- Yearly heatmap -->
![Heatmap - Yearly](https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&period=year)
```

### Specific Repository Card

```markdown
<!-- Random featured repo -->
![Repo](https://gitsense-cards.vercel.app/api/repo?username=YOUR_USERNAME)

<!-- Specific repository -->
![Repo](https://gitsense-cards.vercel.app/api/repo?username=YOUR_USERNAME&repo=gitsense)
```

## Themes

Add `&theme=THEME_NAME` to any card endpoint. All themes work with every card.

| Theme | Style | Colors | Best For |
|-------|-------|--------|----------|
| `dark` | Flat | Blue/Purple/Pink | Default, professional |
| `light` | Flat | Blue/Purple/Pink | Light backgrounds, minimal |
| `neon` | Neon | Cyan/Blue/Magenta | Dark mode, eye-catching |
| `glass` | Glass | Blue/Purple/Pink | Glassmorphism effect |
| `neumorphic` | Soft | Purple/Indigo | Soft, modern look |
| `ocean` | Flat | Cyan/Teal/Blue | Cold tones, water inspiration |
| `sunset` | Flat | Orange/Red/Red | Warm tones, sunset vibes |
| `cyberpunk` | Neon | Yellow/Pink/Cyan | Bold, futuristic look |

### Activity Card - All Themes

**Dark (Default)**
```
https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=dark
```

**Light**
```
https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=light
```

**Neon**
```
https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=neon
```

**Glass**
```
https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=glass
```

**Neumorphic**
```
https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=neumorphic
```

**Ocean**
```
https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=ocean
```

**Sunset**
```
https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=sunset
```

**Cyberpunk**
```
https://gitsense-cards.vercel.app/api/activity?username=YOUR_USERNAME&theme=cyberpunk
```

### Growth Card - All Themes

**Dark (Default)**
```
https://gitsense-cards.vercel.app/api/growth?username=YOUR_USERNAME&theme=dark
```

**Light**
```
https://gitsense-cards.vercel.app/api/growth?username=YOUR_USERNAME&theme=light
```

**Neon**
```
https://gitsense-cards.vercel.app/api/growth?username=YOUR_USERNAME&theme=neon
```

**Glass**
```
https://gitsense-cards.vercel.app/api/growth?username=YOUR_USERNAME&theme=glass
```

**Ocean**
```
https://gitsense-cards.vercel.app/api/growth?username=YOUR_USERNAME&theme=ocean
```

**Sunset**
```
https://gitsense-cards.vercel.app/api/growth?username=YOUR_USERNAME&theme=sunset
```

**Cyberpunk**
```
https://gitsense-cards.vercel.app/api/growth?username=YOUR_USERNAME&theme=cyberpunk
```

### Streak Card - All Themes

**Dark (Default)**
```
https://gitsense-cards.vercel.app/api/streak?username=YOUR_USERNAME&theme=dark
```

**Light**
```
https://gitsense-cards.vercel.app/api/streak?username=YOUR_USERNAME&theme=light
```

**Neon**
```
https://gitsense-cards.vercel.app/api/streak?username=YOUR_USERNAME&theme=neon
```

**Cyberpunk**
```
https://gitsense-cards.vercel.app/api/streak?username=YOUR_USERNAME&theme=cyberpunk
```

### Stats Card - All Themes

**Dark (Default)**
```
https://gitsense-cards.vercel.app/api/stats?username=YOUR_USERNAME&theme=dark
```

**Light**
```
https://gitsense-cards.vercel.app/api/stats?username=YOUR_USERNAME&theme=light
```

**Neon**
```
https://gitsense-cards.vercel.app/api/stats?username=YOUR_USERNAME&theme=neon
```

**Ocean**
```
https://gitsense-cards.vercel.app/api/stats?username=YOUR_USERNAME&theme=ocean
```

**Sunset**
```
https://gitsense-cards.vercel.app/api/stats?username=YOUR_USERNAME&theme=sunset
```

**Cyberpunk**
```
https://gitsense-cards.vercel.app/api/stats?username=YOUR_USERNAME&theme=cyberpunk
```

### Tech Stack Card - All Themes

**Dark (Default)**
```
https://gitsense-cards.vercel.app/api/tech?username=YOUR_USERNAME&theme=dark
```

**Light**
```
https://gitsense-cards.vercel.app/api/tech?username=YOUR_USERNAME&theme=light
```

**Neon**
```
https://gitsense-cards.vercel.app/api/tech?username=YOUR_USERNAME&theme=neon
```

**Glass**
```
https://gitsense-cards.vercel.app/api/tech?username=YOUR_USERNAME&theme=glass
```

**Ocean**
```
https://gitsense-cards.vercel.app/api/tech?username=YOUR_USERNAME&theme=ocean
```

**Cyberpunk**
```
https://gitsense-cards.vercel.app/api/tech?username=YOUR_USERNAME&theme=cyberpunk
```

### Radar Card - All Themes

**Dark (Default)**
```
https://gitsense-cards.vercel.app/api/radar?username=YOUR_USERNAME&theme=dark
```

**Light**
```
https://gitsense-cards.vercel.app/api/radar?username=YOUR_USERNAME&theme=light
```

**Neon**
```
https://gitsense-cards.vercel.app/api/radar?username=YOUR_USERNAME&theme=neon
```

**Glass**
```
https://gitsense-cards.vercel.app/api/radar?username=YOUR_USERNAME&theme=glass
```

**Sunset**
```
https://gitsense-cards.vercel.app/api/radar?username=YOUR_USERNAME&theme=sunset
```

**Cyberpunk**
```
https://gitsense-cards.vercel.app/api/radar?username=YOUR_USERNAME&theme=cyberpunk
```

### Heatmap Card - All Themes

**Dark (Default) - Monthly**
```
https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&theme=dark
```

**Light - Weekly**
```
https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&theme=light&period=week
```

**Neon - Yearly**
```
https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&theme=neon&period=year
```

**Glass**
```
https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&theme=glass
```

**Ocean**
```
https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&theme=ocean
```

**Sunset**
```
https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&theme=sunset
```

**Cyberpunk**
```
https://gitsense-cards.vercel.app/api/heatmap?username=YOUR_USERNAME&theme=cyberpunk
```

### Repository Card - All Themes

**Dark (Default)**
```
https://gitsense-cards.vercel.app/api/repo?username=YOUR_USERNAME&theme=dark
```

**Light**
```
https://gitsense-cards.vercel.app/api/repo?username=YOUR_USERNAME&theme=light
```

**Neon**
```
https://gitsense-cards.vercel.app/api/repo?username=YOUR_USERNAME&theme=neon
```

**Glass**
```
https://gitsense-cards.vercel.app/api/repo?username=YOUR_USERNAME&theme=glass
```

**Sunset**
```
https://gitsense-cards.vercel.app/api/repo?username=YOUR_USERNAME&theme=sunset
```

**Cyberpunk**
```
https://gitsense-cards.vercel.app/api/repo?username=YOUR_USERNAME&theme=cyberpunk
```

## API Endpoints

| Endpoint | Description | Animated |
|----------|-------------|----------|
| `/api/activity` | Weekly activity with bar graph, stats boxes | ✅ Yes |
| `/api/streak` | Contribution streak with circular progress | ✅ Yes |
| `/api/growth` | Stars & repos growth over 6 months (line graphs) | ✅ Yes |
| `/api/tech` | Top 5 languages with animated bars | ✅ Yes |
| `/api/stats` | GitHub stats summary with animated rank | ✅ Yes |
| `/api/radar` | Developer skills radar chart (6 metrics) | ✅ Yes |
| `/api/heatmap` | Activity heatmap (weekly, monthly, yearly) | ✅ Yes |
| `/api/repo` | Featured repository card | ✅ Yes |
| `/api/all` | All cards combined view | ✅ Yes |

## Parameters

| Parameter | Endpoint | Type | Options | Default | Example |
|-----------|----------|------|---------|---------|---------|
| `username` | All | String | Any GitHub username | Required | `username=divyanshupatel17` |
| `theme` | All | String | `dark`, `light`, `neon`, `glass`, `neumorphic`, `ocean`, `sunset`, `cyberpunk` | `dark` | `theme=neon` |
| `repo` | `/api/repo` | String | Any repository name | Random featured repo | `repo=gitsense` |
| `period` | `/api/heatmap` | String | `week`, `month`, `year` | `month` | `period=year` |

### Period Examples

- **Weekly (`period=week`)**: Shows 7 days of activity
- **Monthly (`period=month`)**: Shows last 12 weeks (3 months) of activity (default)
- **Yearly (`period=year`)**: Shows 52 weeks (1 year) of activity with smaller cells

## Features

- 🎨 **8 Beautiful Themes** - Dark, Light, Neon, Glass, Neumorphic, Ocean, Sunset, Cyberpunk
- ✨ **Smooth Animations** - All cards have fluid SVG animations
- 📊 **Multiple Graph Types** - Line graphs (Growth), bar graphs (Activity, Tech), radar charts, heatmaps
- 🔥 **Heatmap Periods** - Weekly, monthly, and yearly views for activity tracking
- 🎯 **Axes & Labels** - All graphs include proper X/Y axes with labeled values
- 💫 **Interactive Elements** - Animated progress circles, glowing effects, pulsing indicators
- 📱 **Responsive & Scalable** - Works perfectly on all devices
- ⚡ **Fast Server-Side Rendering** - Pre-compiled SVG, instant embed
- 🚀 **Zero JavaScript** - Pure SVG + server-side generation
- 🔄 **1-Hour Cache** - Optimized for performance
- 🎭 **Theme Preview Badges** - Show your favorite theme to visitors

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

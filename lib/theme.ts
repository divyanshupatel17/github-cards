export interface Theme {
  name: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderGlow: string;
  text: string;
  subtext: string;
  accent: string;
  accentSecondary: string;
  gradient: [string, string, string];
  glowIntensity: number;
  shadowColor: string;
  style: "flat" | "glass" | "neumorphic" | "neon" | "minimal";
}

const themes: Record<string, Theme> = {
  dark: {
    name: "dark",
    background: "#0d1117",
    surface: "#161b22",
    surfaceAlt: "#21262d",
    border: "#30363d",
    borderGlow: "#58a6ff",
    text: "#e6edf3",
    subtext: "#8b949e",
    accent: "#58a6ff",
    accentSecondary: "#a371f7",
    gradient: ["#58a6ff", "#a371f7", "#f778ba"],
    glowIntensity: 0.4,
    shadowColor: "rgba(0,0,0,0.5)",
    style: "flat",
  },
  light: {
    name: "light",
    background: "#ffffff",
    surface: "#f6f8fa",
    surfaceAlt: "#eaeef2",
    border: "#d0d7de",
    borderGlow: "#0969da",
    text: "#1f2328",
    subtext: "#656d76",
    accent: "#0969da",
    accentSecondary: "#8250df",
    gradient: ["#0969da", "#8250df", "#bf3989"],
    glowIntensity: 0.2,
    shadowColor: "rgba(0,0,0,0.1)",
    style: "flat",
  },
  neon: {
    name: "neon",
    background: "#0a0a0f",
    surface: "#12121a",
    surfaceAlt: "#1a1a25",
    border: "#2d2d3a",
    borderGlow: "#00fff7",
    text: "#ffffff",
    subtext: "#a0a0b0",
    accent: "#00fff7",
    accentSecondary: "#ff00ff",
    gradient: ["#00fff7", "#00a6ff", "#ff00ff"],
    glowIntensity: 0.8,
    shadowColor: "rgba(0,255,247,0.3)",
    style: "neon",
  },
  glass: {
    name: "glass",
    background: "#0f0f1a",
    surface: "#1a1a2e",
    surfaceAlt: "#252542",
    border: "#3d3d5c",
    borderGlow: "#60a5fa",
    text: "#f0f0f5",
    subtext: "#9090a0",
    accent: "#60a5fa",
    accentSecondary: "#c084fc",
    gradient: ["#60a5fa", "#a78bfa", "#f472b6"],
    glowIntensity: 0.3,
    shadowColor: "rgba(0,0,0,0.4)",
    style: "glass",
  },
  neumorphic: {
    name: "neumorphic",
    background: "#e0e5ec",
    surface: "#e0e5ec",
    surfaceAlt: "#d1d9e6",
    border: "#c8d0e0",
    borderGlow: "#6366f1",
    text: "#374151",
    subtext: "#6b7280",
    accent: "#6366f1",
    accentSecondary: "#8b5cf6",
    gradient: ["#6366f1", "#8b5cf6", "#a855f7"],
    glowIntensity: 0.1,
    shadowColor: "#a3b1c6",
    style: "neumorphic",
  },
  ocean: {
    name: "ocean",
    background: "#0c1929",
    surface: "#132337",
    surfaceAlt: "#1a2f47",
    border: "#234567",
    borderGlow: "#06b6d4",
    text: "#e0f2fe",
    subtext: "#7dd3fc",
    accent: "#06b6d4",
    accentSecondary: "#22d3ee",
    gradient: ["#0891b2", "#06b6d4", "#22d3ee"],
    glowIntensity: 0.5,
    shadowColor: "rgba(6,182,212,0.2)",
    style: "flat",
  },
  sunset: {
    name: "sunset",
    background: "#1a1015",
    surface: "#261a1f",
    surfaceAlt: "#332228",
    border: "#4a3038",
    borderGlow: "#f97316",
    text: "#fef3c7",
    subtext: "#fbbf24",
    accent: "#f97316",
    accentSecondary: "#ef4444",
    gradient: ["#f97316", "#ef4444", "#dc2626"],
    glowIntensity: 0.5,
    shadowColor: "rgba(249,115,22,0.2)",
    style: "flat",
  },
  cyberpunk: {
    name: "cyberpunk",
    background: "#0d0221",
    surface: "#150530",
    surfaceAlt: "#1f0840",
    border: "#3d1a6d",
    borderGlow: "#f5d300",
    text: "#f5f5f5",
    subtext: "#c792ea",
    accent: "#f5d300",
    accentSecondary: "#ff2a6d",
    gradient: ["#f5d300", "#ff2a6d", "#05d9e8"],
    glowIntensity: 0.9,
    shadowColor: "rgba(245,211,0,0.3)",
    style: "neon",
  },
};

export function getTheme(name: string): Theme {
  return themes[name] || themes.dark;
}

export function createGradientDefs(theme: Theme, id: string): string {
  const [c1, c2, c3] = theme.gradient;
  const glowStd = theme.glowIntensity * 5;

  return `
    <defs>
      <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="50%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </linearGradient>
      <linearGradient id="grad-h-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="50%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </linearGradient>
      <linearGradient id="grad-v-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
      <linearGradient id="shimmer-${id}" x1="-100%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="transparent"/>
        <stop offset="50%" stop-color="rgba(255,255,255,0.05)"/>
        <stop offset="100%" stop-color="transparent"/>
        <animate attributeName="x1" values="-100%;100%" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="0%;200%" dur="3s" repeatCount="indefinite"/>
      </linearGradient>
      <filter id="glow-${id}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="${glowStd}" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="glow-strong-${id}" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="${glowStd * 2}" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="shadow-${id}">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${theme.shadowColor}" flood-opacity="0.5"/>
      </filter>
      <filter id="shadow-sm-${id}">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="${theme.shadowColor}" flood-opacity="0.3"/>
      </filter>
      <filter id="inner-glow-${id}">
        <feFlood flood-color="${c1}" result="flood"/>
        <feComposite in="flood" in2="SourceGraphic" operator="in" result="mask"/>
        <feGaussianBlur in="mask" stdDeviation="2" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <clipPath id="clip-${id}">
        <rect x="0" y="0" width="100%" height="100%" rx="16"/>
      </clipPath>
      <pattern id="grid-${id}" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${theme.border}" stroke-width="0.5" opacity="0.5"/>
      </pattern>
      <pattern id="dots-${id}" width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.5" fill="${theme.border}" opacity="0.4"/>
      </pattern>
    </defs>
  `;
}

export function createCardBackground(
  width: number,
  height: number,
  theme: Theme,
  id: string
): string {
  const rx = 16;
  const [c1] = theme.gradient;

  if (theme.style === "glass") {
    return `
      <rect x="0" y="0" width="${width}" height="${height}" rx="${rx}" fill="${theme.background}"/>
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${rx - 1}"
        fill="${theme.surface}" stroke="url(#grad-${id})" stroke-opacity="0.4" stroke-width="1"/>
      <rect x="1" y="1" width="${width - 2}" height="${height * 0.4}" rx="${rx - 1}"
        fill="url(#shimmer-${id})" clip-path="url(#clip-${id})"/>
    `;
  }

  if (theme.style === "neumorphic") {
    return `
      <rect x="0" y="0" width="${width}" height="${height}" rx="${rx}" fill="${theme.background}"/>
      <rect x="8" y="8" width="${width - 16}" height="${height - 16}" rx="${rx - 4}"
        fill="${theme.surface}" filter="url(#shadow-${id})"/>
    `;
  }

  if (theme.style === "neon") {
    return `
      <rect x="0" y="0" width="${width}" height="${height}" rx="${rx}" fill="${theme.background}"/>
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${rx - 1}"
        fill="${theme.surface}" stroke="url(#grad-${id})" stroke-width="2"/>
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${rx - 1}"
        fill="none" stroke="${c1}" stroke-width="1" opacity="0.3" filter="url(#glow-${id})"/>
    `;
  }

  return `
    <rect x="0" y="0" width="${width}" height="${height}" rx="${rx}" fill="${theme.background}"/>
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${rx - 1}"
      fill="${theme.surface}" stroke="${theme.border}" stroke-width="1"/>
  `;
}

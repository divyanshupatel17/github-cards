export interface Theme {
  background: string;
  text: string;
  subtext: string;
  accent: string;
  accentSecondary: string;
  glow: string;
  glowSecondary: string;
  border: string;
}

const themes: Record<string, Theme> = {
  dark: {
    background: "#0d1117",
    text: "#e6edf3",
    subtext: "#8b949e",
    accent: "#58a6ff",
    accentSecondary: "#a371f7",
    glow: "#58a6ff",
    glowSecondary: "#a371f7",
    border: "#30363d",
  },
  light: {
    background: "#ffffff",
    text: "#24292f",
    subtext: "#57606a",
    accent: "#0969da",
    accentSecondary: "#8250df",
    glow: "#0969da",
    glowSecondary: "#8250df",
    border: "#d0d7de",
  },
  neon: {
    background: "#0a0a0f",
    text: "#00ffff",
    subtext: "#00cccc",
    accent: "#00ffff",
    accentSecondary: "#ff00ff",
    glow: "#00ffff",
    glowSecondary: "#ff00ff",
    border: "#1a1a2e",
  },
  ocean: {
    background: "#0c1929",
    text: "#64ffda",
    subtext: "#8892b0",
    accent: "#64ffda",
    accentSecondary: "#7f5af0",
    glow: "#64ffda",
    glowSecondary: "#7f5af0",
    border: "#1e3a5f",
  },
  sunset: {
    background: "#1a1423",
    text: "#ffd700",
    subtext: "#c9a227",
    accent: "#ff6b6b",
    accentSecondary: "#ffd700",
    glow: "#ff6b6b",
    glowSecondary: "#ffd700",
    border: "#2d1f3d",
  },
};

export function getTheme(name: string): Theme {
  return themes[name] || themes.dark;
}

export function createGradientDefs(theme: Theme, id: string): string {
  return `
    <defs>
      <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${theme.accent};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${theme.accentSecondary};stop-opacity:1" />
      </linearGradient>
      <linearGradient id="grad-h-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${theme.accent};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${theme.accentSecondary};stop-opacity:1" />
      </linearGradient>
      <filter id="glow-${id}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="glow"/>
        <feMerge>
          <feMergeNode in="glow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="shadow-${id}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${theme.glow}" flood-opacity="0.3"/>
      </filter>
    </defs>
  `;
}

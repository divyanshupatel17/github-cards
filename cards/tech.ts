import { Theme, createGradientDefs } from "@/lib/theme";
import { GitHubStats } from "@/lib/github";
import { wrapSvg, createCard, calculatePercentages } from "@/lib/utils";

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

export function renderTechCard(stats: GitHubStats, theme: Theme): string {
  const width = 400;
  const height = 240;
  const id = "tech";
  const defs = createGradientDefs(theme, id);

  const langs = calculatePercentages(stats.languages);
  const maxBarWidth = 200;

  const content = `
    ${createCard(width, height, theme.background, theme.border)}

    <text x="24" y="28" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="16" font-weight="600">
      Tech Stack
    </text>
    <text x="24" y="44" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11">
      @${stats.user.login} · Top Languages
    </text>

    <g transform="translate(24, 60)">
      ${langs
        .slice(0, 6)
        .map((lang, i) => {
          const y = i * 28;
          const barWidth = (lang.percent / 100) * maxBarWidth;
          const color = languageColors[lang.name] || theme.accent;
          return `
            <g transform="translate(0, ${y})">
              <text x="0" y="12" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12">
                ${lang.name}
              </text>
              <text x="${maxBarWidth + 100}" y="12" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11" text-anchor="end">
                ${lang.percent}%
              </text>
              <rect x="100" y="2" width="${maxBarWidth}" height="14" rx="4" fill="${theme.border}" opacity="0.3"/>
              <rect x="100" y="2" width="${barWidth}" height="14" rx="4" fill="${color}"/>
              <circle cx="92" cy="9" r="4" fill="${color}"/>
            </g>
          `;
        })
        .join("")}
    </g>

    <line x1="24" y1="${60 + langs.length * 28 + 10}" x2="376" y2="${60 + langs.length * 28 + 10}" stroke="${theme.border}" stroke-width="1"/>

    <text x="24" y="${60 + langs.length * 28 + 30}" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="10">
      ${stats.repos.length} repositories · ${stats.totalStars} stars · ${stats.totalForks} forks
    </text>
  `;

  return wrapSvg(content, width, height, defs);
}

import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats } from "@/lib/github";
import { wrapSvg, calculatePercentages, formatNumber } from "@/lib/utils";

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
  const width = 450;
  const height = 200;
  const id = "tech";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const langs = calculatePercentages(stats.languages);
  const maxBarWidth = 160;

  const content = `
    ${bg}

    <g transform="translate(20, 20)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700">
        Tech Stack
      </text>
      <text x="0" y="20" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        @${stats.user.login} · Top Languages
      </text>
    </g>

    <g transform="translate(20, 55)">
      ${langs
        .slice(0, 5)
        .map((lang, i) => {
          const y = i * 26;
          const barWidth = Math.max((lang.percent / 100) * maxBarWidth, 6);
          const color = languageColors[lang.name] || theme.accent;
          const delay = i * 0.1;
          return `
            <g transform="translate(0, ${y})">
              <rect x="0" y="0" width="${width - 40}" height="22" rx="6" fill="${theme.surfaceAlt}" opacity="0.3"/>

              <circle cx="14" cy="11" r="6" fill="${color}">
                <animate attributeName="r" values="5;6;5" dur="2s" repeatCount="indefinite" begin="${delay}s"/>
              </circle>

              <text x="28" y="15" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600">
                ${lang.name}
              </text>

              <g transform="translate(120, 5)">
                <rect x="0" y="0" width="${maxBarWidth}" height="12" rx="6" fill="${theme.border}" opacity="0.3"/>
                <rect x="0" y="0" width="0" height="12" rx="6" fill="${color}" opacity="0.9">
                  <animate attributeName="width" from="0" to="${barWidth}" dur="0.7s" begin="${0.2 + delay}s" fill="freeze" calcMode="spline" keySplines="0.34 1.56 0.64 1"/>
                </rect>
                <rect x="0" y="0" width="0" height="12" rx="6" fill="${color}" opacity="0.3" filter="url(#glow-${id})">
                  <animate attributeName="width" from="0" to="${barWidth}" dur="1s" begin="${0.2 + delay}s" fill="freeze" calcMode="spline" keySplines="0.34 1.56 0.64 1"/>
                </rect>
              </g>

              <text x="${120 + maxBarWidth + 15}" y="15" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="700">
                ${lang.percent}%
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="${0.6 + delay}s" fill="freeze"/>
              </text>

              <text x="${width - 60}" y="15" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" font-weight="500">
                ${lang.value} repos
              </text>
            </g>
          `;
        })
        .join("")}
    </g>

    <g transform="translate(20, 185)">
      <rect width="${width - 40}" height="1" fill="url(#grad-h-${id})" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
      </rect>
    </g>

    <g transform="translate(20, 192)">
      <rect width="85" height="6" rx="3" fill="${theme.surfaceAlt}"/>
      <text x="95" y="5" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9">${stats.repos.length} repos</text>

      <rect x="150" width="85" height="6" rx="3" fill="${theme.surfaceAlt}"/>
      <text x="245" y="5" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9">${formatNumber(stats.totalStars)} stars</text>

      <rect x="300" width="85" height="6" rx="3" fill="${theme.surfaceAlt}"/>
      <text x="395" y="5" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9">${formatNumber(stats.totalForks)} forks</text>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

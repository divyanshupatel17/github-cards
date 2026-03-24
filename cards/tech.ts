import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats } from "@/lib/github";
import { wrapSvg, calculatePercentages, generateIcon } from "@/lib/utils";

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
  const width = 420;
  const height = 220;
  const id = "tech";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const langs = calculatePercentages(stats.languages);
  const maxBarWidth = 180;

  const content = `
    ${bg}

    <g transform="translate(24, 20)">
      ${generateIcon("code", 0, 0, 18, theme.accent)}
      <text x="26" y="14" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="700">
        Tech Stack
      </text>
      <text x="0" y="34" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        @${stats.user.login} · Top Languages
      </text>
    </g>

    <g transform="translate(24, 70)">
      ${langs
        .slice(0, 5)
        .map((lang, i) => {
          const y = i * 28;
          const barWidth = Math.max((lang.percent / 100) * maxBarWidth, 4);
          const color = languageColors[lang.name] || theme.accent;
          return `
            <g transform="translate(0, ${y})">
              <circle cx="5" cy="8" r="5" fill="${color}">
                <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" begin="${i * 0.2}s"/>
              </circle>

              <text x="18" y="12" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="500">
                ${lang.name}
              </text>

              <g transform="translate(110, 0)">
                <rect x="0" y="3" width="${maxBarWidth}" height="10" rx="5" fill="${theme.surfaceAlt}" opacity="0.5"/>
                <rect x="0" y="3" width="${barWidth}" height="10" rx="5" fill="${color}">
                  <animate attributeName="width" from="0" to="${barWidth}" dur="0.8s" fill="freeze" begin="${i * 0.1}s"/>
                </rect>
              </g>

              <text x="300" y="12" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" font-weight="500">
                ${lang.percent}%
              </text>
            </g>
          `;
        })
        .join("")}
    </g>

    <g transform="translate(24, 195)">
      <rect x="0" y="-5" width="372" height="1" fill="url(#grad-h-${id})" opacity="0.3"/>

      <g transform="translate(0, 8)">
        ${generateIcon("repo", 0, -2, 12, theme.subtext)}
        <text x="18" y="8" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10">
          ${stats.repos.length} repos
        </text>

        ${generateIcon("star", 90, -2, 12, theme.subtext)}
        <text x="108" y="8" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10">
          ${stats.totalStars} stars
        </text>

        ${generateIcon("fork", 180, -2, 12, theme.subtext)}
        <text x="198" y="8" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10">
          ${stats.totalForks} forks
        </text>
      </g>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

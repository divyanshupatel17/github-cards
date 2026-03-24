import { Theme, createGradientDefs } from "@/lib/theme";
import { GitHubStats, calculateGrowth } from "@/lib/github";
import {
  formatNumber,
  wrapSvg,
  createCard,
  generateLineGraph,
  generateGridBackground,
} from "@/lib/utils";

export function renderGrowthCard(stats: GitHubStats, theme: Theme): string {
  const width = 480;
  const height = 220;
  const id = "growth";
  const defs = createGradientDefs(theme, id);
  const growth = calculateGrowth(stats.repos);

  const content = `
    ${createCard(width, height, theme.background, theme.border)}

    <text x="24" y="28" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="16" font-weight="600">
      Growth Analytics
    </text>
    <text x="24" y="44" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11">
      @${stats.user.login} · Last 6 months
    </text>

    <g transform="translate(24, 60)">
      <rect width="200" height="140" rx="8" fill="${theme.border}" opacity="0.2"/>
      <g transform="translate(10, 10)">
        ${generateGridBackground(180, 100, theme.border, 30)}
      </g>
      <text x="100" y="15" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="10" text-anchor="middle">
        Stars Growth
      </text>
      <g transform="translate(10, 25)">
        ${generateLineGraph(growth.starsData, 180, 80, theme.accent, true)}
      </g>
      <text x="100" y="130" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12" font-weight="600" text-anchor="middle">
        ${formatNumber(stats.totalStars)} total
      </text>
    </g>

    <g transform="translate(254, 60)">
      <rect width="200" height="140" rx="8" fill="${theme.border}" opacity="0.2"/>
      <g transform="translate(10, 10)">
        ${generateGridBackground(180, 100, theme.border, 30)}
      </g>
      <text x="100" y="15" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="10" text-anchor="middle">
        Repository Growth
      </text>
      <g transform="translate(10, 25)">
        ${generateLineGraph(growth.reposData, 180, 80, theme.accentSecondary, true)}
      </g>
      <text x="100" y="130" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12" font-weight="600" text-anchor="middle">
        ${stats.repos.length} repos
      </text>
    </g>

    <g transform="translate(24, 205)">
      ${growth.months
        .map(
          (m, i) =>
            `<text x="${40 + i * 35}" y="0" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="9" text-anchor="middle">${m}</text>`
        )
        .join("")}
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

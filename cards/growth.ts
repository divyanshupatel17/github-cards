import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats, calculateGrowth } from "@/lib/github";
import {
  formatNumber,
  wrapSvg,
  generateLineGraph,
  generateGridBackground,
  generateIcon,
} from "@/lib/utils";

export function renderGrowthCard(stats: GitHubStats, theme: Theme): string {
  const width = 420;
  const height = 200;
  const id = "growth";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);
  const growth = calculateGrowth(stats.repos);

  const content = `
    ${bg}

    <g transform="translate(24, 20)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="700">
        Growth Analytics
      </text>
      <text x="0" y="18" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        @${stats.user.login} · Last 6 months
      </text>
    </g>

    <g transform="translate(24, 58)">
      <rect width="178" height="120" rx="10" fill="${theme.surfaceAlt}" opacity="0.3"/>
      <rect width="178" height="120" rx="10" fill="none" stroke="${theme.border}" stroke-width="1" opacity="0.4"/>

      <g transform="translate(8, 8)">
        ${generateGridBackground(162, 90, theme, id)}
      </g>

      <g transform="translate(12, 12)">
        ${generateIcon("star", 0, 0, 12, theme.gradient[0])}
        <text x="18" y="10" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" font-weight="500">
          Stars Growth
        </text>
      </g>

      <g transform="translate(8, 28)">
        ${generateLineGraph(growth.starsData, 162, 65, theme, id, true, true)}
      </g>

      <text x="89" y="110" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600" text-anchor="middle">
        ${formatNumber(stats.totalStars)} total
      </text>
    </g>

    <g transform="translate(218, 58)">
      <rect width="178" height="120" rx="10" fill="${theme.surfaceAlt}" opacity="0.3"/>
      <rect width="178" height="120" rx="10" fill="none" stroke="${theme.border}" stroke-width="1" opacity="0.4"/>

      <g transform="translate(8, 8)">
        ${generateGridBackground(162, 90, theme, id)}
      </g>

      <g transform="translate(12, 12)">
        ${generateIcon("repo", 0, 0, 12, theme.gradient[1])}
        <text x="18" y="10" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" font-weight="500">
          Repository Growth
        </text>
      </g>

      <g transform="translate(8, 28)">
        ${generateLineGraph(growth.reposData, 162, 65, theme, id, true, true)}
      </g>

      <text x="89" y="110" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600" text-anchor="middle">
        ${stats.repos.length} repos
      </text>
    </g>

    <g transform="translate(24, 185)">
      ${growth.months
        .map(
          (m, i) =>
            `<text x="${30 + i * 32}" y="0" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" text-anchor="middle" opacity="0.8">${m}</text>`
        )
        .join("")}
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

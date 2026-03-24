import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats, estimateWeeklyActivity } from "@/lib/github";
import {
  formatNumber,
  wrapSvg,
  generateBarGraph,
  generateSparkline,
  generateIcon,
} from "@/lib/utils";

export function renderActivityCard(stats: GitHubStats, theme: Theme): string {
  const width = 420;
  const height = 220;
  const id = "activity";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const weeklyActivity = estimateWeeklyActivity(stats.repos);
  const recentStars = stats.repos
    .slice(0, 7)
    .map((r) => r.stargazers_count)
    .reverse();

  const content = `
    ${bg}

    <g transform="translate(24, 24)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700">
        ${stats.user.name || stats.user.login}
      </text>
      <text x="0" y="20" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12">
        @${stats.user.login}
      </text>
    </g>

    <g transform="translate(24, 70)">
      <rect x="0" y="0" width="170" height="60" rx="10" fill="${theme.surfaceAlt}" opacity="0.4"/>
      <rect x="0" y="0" width="170" height="60" rx="10" fill="none" stroke="${theme.border}" stroke-width="1" opacity="0.5"/>

      <g transform="translate(15, 15)">
        ${generateIcon("repo", 0, 0, 16, theme.accent)}
        <text x="24" y="12" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
          Repositories
        </text>
        <text x="24" y="30" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700">
          ${formatNumber(stats.user.public_repos)}
        </text>
      </g>
    </g>

    <g transform="translate(204, 70)">
      <rect x="0" y="0" width="85" height="60" rx="10" fill="${theme.surfaceAlt}" opacity="0.4"/>
      <rect x="0" y="0" width="85" height="60" rx="10" fill="none" stroke="${theme.border}" stroke-width="1" opacity="0.5"/>

      <g transform="translate(12, 15)">
        ${generateIcon("star", 0, 0, 14, theme.gradient[0])}
        <text x="0" y="30" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="600">
          ${formatNumber(stats.totalStars)}
        </text>
      </g>
    </g>

    <g transform="translate(299, 70)">
      <rect x="0" y="0" width="95" height="60" rx="10" fill="${theme.surfaceAlt}" opacity="0.4"/>
      <rect x="0" y="0" width="95" height="60" rx="10" fill="none" stroke="${theme.border}" stroke-width="1" opacity="0.5"/>

      <g transform="translate(12, 15)">
        ${generateIcon("user", 0, 0, 14, theme.gradient[1])}
        <text x="0" y="30" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="600">
          ${formatNumber(stats.user.followers)}
        </text>
      </g>
    </g>

    <g transform="translate(24, 145)">
      <text fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" font-weight="500">
        WEEKLY ACTIVITY
      </text>

      <g transform="translate(0, 16)">
        ${generateBarGraph(weeklyActivity, 170, 45, theme, id)}
      </g>
    </g>

    <g transform="translate(220, 145)">
      <text fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" font-weight="500">
        STARS TREND
      </text>

      <g transform="translate(0, 16)">
        <rect x="0" y="0" width="174" height="45" rx="6" fill="${theme.surfaceAlt}" opacity="0.3"/>
        <g transform="translate(8, 6)">
          ${generateSparkline(recentStars, 158, 33, theme.gradient[0])}
        </g>
      </g>
    </g>

    <g transform="translate(${width - 50}, 24)">
      <circle cx="13" cy="13" r="6" fill="${theme.accent}" opacity="0.3">
        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="13" cy="13" r="4" fill="${theme.accent}"/>
      <text x="13" y="32" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" text-anchor="middle">
        LIVE
      </text>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

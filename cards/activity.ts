import { Theme, createGradientDefs } from "@/lib/theme";
import { GitHubStats, estimateWeeklyActivity } from "@/lib/github";
import {
  formatNumber,
  wrapSvg,
  createCard,
  generateBarGraph,
  generateLineGraph,
} from "@/lib/utils";

export function renderActivityCard(stats: GitHubStats, theme: Theme): string {
  const width = 480;
  const height = 200;
  const id = "activity";
  const defs = createGradientDefs(theme, id);
  const weeklyActivity = estimateWeeklyActivity(stats.repos);

  const content = `
    ${createCard(width, height, theme.background, theme.border)}

    <text x="24" y="32" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="18" font-weight="600">
      ${stats.user.name || stats.user.login}
    </text>
    <text x="24" y="50" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12">
      @${stats.user.login}
    </text>

    <g transform="translate(24, 70)">
      <circle cx="8" cy="8" r="8" fill="${theme.accent}" opacity="0.2"/>
      <text x="24" y="12" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="14" font-weight="500">
        ${formatNumber(stats.totalStars)}
      </text>
      <text x="24" y="26" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11">
        Stars
      </text>
    </g>

    <g transform="translate(100, 70)">
      <circle cx="8" cy="8" r="8" fill="${theme.accentSecondary}" opacity="0.2"/>
      <text x="24" y="12" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="14" font-weight="500">
        ${formatNumber(stats.user.followers)}
      </text>
      <text x="24" y="26" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11">
        Followers
      </text>
    </g>

    <g transform="translate(176, 70)">
      <circle cx="8" cy="8" r="8" fill="${theme.accent}" opacity="0.2"/>
      <text x="24" y="12" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="14" font-weight="500">
        ${stats.repos.length}
      </text>
      <text x="24" y="26" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11">
        Repos
      </text>
    </g>

    <text x="24" y="130" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11">
      Weekly Activity
    </text>
    <g transform="translate(24, 140)">
      ${generateBarGraph(weeklyActivity, 180, 45, theme.accent, `grad-${id}`)}
    </g>

    <text x="260" y="130" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11">
      Activity Trend
    </text>
    <g transform="translate(260, 140)">
      ${generateLineGraph(weeklyActivity, 180, 45, theme.accent, true)}
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

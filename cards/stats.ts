import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats } from "@/lib/github";
import { wrapSvg, formatNumber, generateIcon, generateCircularProgress } from "@/lib/utils";

export function renderStatsCard(stats: GitHubStats, theme: Theme): string {
  const width = 420;
  const height = 200;
  const id = "stats";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const totalContributions = stats.repos.length + stats.totalStars + stats.user.followers;
  const maxContributions = 1000;
  const progressPercent = Math.min((totalContributions / maxContributions) * 100, 100);

  const rank = totalContributions > 500 ? "A+" :
               totalContributions > 200 ? "A" :
               totalContributions > 100 ? "B+" :
               totalContributions > 50 ? "B" : "C";

  const content = `
    ${bg}

    <g transform="translate(24, 20)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="700">
        ${stats.user.name || stats.user.login}'s GitHub Stats
      </text>
      <text x="0" y="18" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        @${stats.user.login}
      </text>
    </g>

    <g transform="translate(24, 60)">
      <g transform="translate(0, 0)">
        ${generateIcon("star", 0, 0, 16, theme.gradient[0])}
        <text x="24" y="12" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
          Total Stars Earned
        </text>
        <text x="180" y="12" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="600" text-anchor="end">
          ${formatNumber(stats.totalStars)}
        </text>
      </g>

      <g transform="translate(0, 28)">
        ${generateIcon("commit", 0, 0, 16, theme.gradient[1])}
        <text x="24" y="12" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
          Total Repositories
        </text>
        <text x="180" y="12" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="600" text-anchor="end">
          ${stats.user.public_repos}
        </text>
      </g>

      <g transform="translate(0, 56)">
        ${generateIcon("fork", 0, 0, 16, theme.gradient[2])}
        <text x="24" y="12" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
          Total Forks
        </text>
        <text x="180" y="12" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="600" text-anchor="end">
          ${formatNumber(stats.totalForks)}
        </text>
      </g>

      <g transform="translate(0, 84)">
        ${generateIcon("user", 0, 0, 16, theme.accent)}
        <text x="24" y="12" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
          Followers
        </text>
        <text x="180" y="12" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="600" text-anchor="end">
          ${formatNumber(stats.user.followers)}
        </text>
      </g>
    </g>

    <g transform="translate(320, 110)">
      ${generateCircularProgress(progressPercent, 0, 0, 45, 6, theme, id)}
      <text x="0" y="6" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="24" font-weight="700" text-anchor="middle">
        ${rank}
      </text>
      <text x="0" y="22" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" text-anchor="middle">
        Rank
      </text>
    </g>

    <g transform="translate(230, 60)">
      <rect x="0" y="0" width="1" height="110" fill="${theme.border}" opacity="0.3"/>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

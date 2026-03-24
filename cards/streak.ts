import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats, calculateStreak } from "@/lib/github";
import { wrapSvg, generateCircularProgress, generateIcon } from "@/lib/utils";

export function renderStreakCard(stats: GitHubStats, theme: Theme): string {
  const width = 420;
  const height = 200;
  const id = "streak";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);
  const streakData = calculateStreak(stats.repos);

  const content = `
    ${bg}

    <g transform="translate(24, 24)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="700">
        Contribution Streak
      </text>
      <text x="0" y="18" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12">
        @${stats.user.login}
      </text>
    </g>

    <g transform="translate(100, 115)">
      ${generateCircularProgress(streakData.consistency, 0, 0, 52, 8, theme, id)}
      <text x="0" y="6" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="28" font-weight="700" text-anchor="middle">
        ${streakData.current}
      </text>
      <text x="0" y="22" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" text-anchor="middle">
        days
      </text>
    </g>

    <g transform="translate(200, 65)">
      <rect x="0" y="0" width="195" height="50" rx="10" fill="${theme.surfaceAlt}" opacity="0.4"/>
      <rect x="0" y="0" width="195" height="50" rx="10" fill="none" stroke="${theme.border}" stroke-width="1" opacity="0.3"/>

      <g transform="translate(16, 12)">
        ${generateIcon("trending", 0, 0, 14, theme.gradient[0])}
        <text x="22" y="10" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10">
          Longest Streak
        </text>
        <text x="22" y="26" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="600">
          ${streakData.longest} days
        </text>
      </g>

      <g transform="translate(115, 12)">
        ${generateIcon("zap", 0, 0, 14, theme.gradient[1])}
        <text x="20" y="10" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10">
          Consistency
        </text>
        <text x="20" y="26" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="600">
          ${streakData.consistency}%
        </text>
      </g>
    </g>

    <g transform="translate(200, 130)">
      <rect x="0" y="0" width="195" height="48" rx="10" fill="url(#grad-${id})" opacity="0.15"/>
      <rect x="0" y="0" width="195" height="48" rx="10" fill="none" stroke="url(#grad-${id})" stroke-width="1" opacity="0.4"/>

      <text x="97" y="18" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" text-anchor="middle">
        Current Streak
      </text>
      <g transform="translate(97, 24)">
        ${generateIcon("flame", -8, 0, 16, theme.gradient[0])}
        <text x="12" y="14" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="700" filter="url(#glow-${id})">
          ${streakData.current} Days
        </text>
      </g>
    </g>

    <g transform="translate(24, 175)">
      <line x1="0" y1="0" x2="130" y2="0" stroke="url(#grad-h-${id})" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

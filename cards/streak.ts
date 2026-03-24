import { Theme, createGradientDefs } from "@/lib/theme";
import { GitHubStats, calculateStreak } from "@/lib/github";
import { wrapSvg, createCard, generateCircularProgress } from "@/lib/utils";

export function renderStreakCard(stats: GitHubStats, theme: Theme): string {
  const width = 400;
  const height = 180;
  const id = "streak";
  const defs = createGradientDefs(theme, id);
  const streakData = calculateStreak(stats.repos);

  const content = `
    ${createCard(width, height, theme.background, theme.border)}

    <text x="24" y="28" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="16" font-weight="600">
      Contribution Streak
    </text>
    <text x="24" y="44" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="11">
      @${stats.user.login}
    </text>

    <g transform="translate(90, 110)">
      ${generateCircularProgress(
        streakData.consistency,
        0,
        0,
        45,
        8,
        theme.border,
        theme.accent,
        `grad-${id}`
      )}
      <text x="0" y="5" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="20" font-weight="700" text-anchor="middle">
        ${streakData.current}
      </text>
      <text x="0" y="20" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="10" text-anchor="middle">
        days
      </text>
    </g>

    <g transform="translate(200, 75)">
      <rect x="0" y="0" width="180" height="40" rx="8" fill="${theme.border}" opacity="0.3"/>
      <text x="15" y="17" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="10">
        Longest Streak
      </text>
      <text x="15" y="32" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="14" font-weight="600">
        ${streakData.longest} days
      </text>
      <text x="110" y="17" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="10">
        Consistency
      </text>
      <text x="110" y="32" fill="${theme.accent}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="14" font-weight="600">
        ${streakData.consistency}%
      </text>
    </g>

    <g transform="translate(200, 125)">
      <rect x="0" y="0" width="180" height="36" rx="8" fill="url(#grad-${id})" opacity="0.15"/>
      <text x="90" y="14" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="10" text-anchor="middle">
        Current Streak
      </text>
      <text x="90" y="29" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="14" font-weight="700" text-anchor="middle" filter="url(#glow-${id})">
        ${streakData.current} Days
      </text>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

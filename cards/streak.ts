import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats, calculateStreak } from "@/lib/github";
import { wrapSvg } from "@/lib/utils";

export function renderStreakCard(stats: GitHubStats, theme: Theme): string {
  const width = 450;
  const height = 195;
  const id = "streak";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);
  const streakData = calculateStreak(stats.repos);

  const radius = 55;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (streakData.consistency / 100) * circumference;

  const content = `
    ${bg}

    <g transform="translate(20, 20)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700">
        Contribution Streak
      </text>
      <text x="0" y="20" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12">
        @${stats.user.login}
      </text>
    </g>

    <g transform="translate(95, 115)">
      <circle cx="0" cy="0" r="${radius}" fill="none" stroke="${theme.surfaceAlt}" stroke-width="${strokeWidth}"/>

      <circle cx="0" cy="0" r="${radius}" fill="none" stroke="url(#grad-${id})" stroke-width="${strokeWidth}"
        stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}" stroke-linecap="round"
        transform="rotate(-90)" filter="url(#glow-${id})">
        <animate attributeName="stroke-dashoffset" from="${circumference}" to="${offset}" dur="1.2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
      </circle>

      <circle cx="0" cy="0" r="${radius - strokeWidth - 5}" fill="none" stroke="${theme.border}" stroke-width="1" opacity="0.3"/>

      <text x="0" y="-8" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="36" font-weight="800" text-anchor="middle">
        ${streakData.current}
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze"/>
      </text>
      <text x="0" y="12" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" text-anchor="middle" font-weight="500">
        DAYS
      </text>

      <g transform="translate(0, ${radius + 20})">
        <rect x="-40" y="0" width="80" height="22" rx="11" fill="url(#grad-${id})" opacity="0.2"/>
        <text x="0" y="15" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="600">
          ${streakData.consistency}% consistent
        </text>
      </g>
    </g>

    <g transform="translate(200, 50)">
      <rect width="230" height="55" rx="12" fill="${theme.surfaceAlt}" opacity="0.8" filter="url(#shadow-sm-${id})"/>

      <g transform="translate(20, 15)">
        <text fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" font-weight="700">LONGEST STREAK</text>
        <text y="22" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="21" font-weight="800">
          ${streakData.longest}
          <tspan fill="${theme.subtext}" font-size="11" font-weight="500"> days</tspan>
          <animate attributeName="opacity" from="0" to="1" dur="0.6s" fill="freeze"/>
        </text>
      </g>

      <line x1="115" y1="12" x2="115" y2="43" stroke="${theme.border}" stroke-width="1.5" opacity="0.5"/>

      <g transform="translate(130, 15)">
        <text fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" font-weight="700">CURRENT</text>
        <text y="22" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="21" font-weight="800" filter="url(#glow-${id})">
          ${streakData.current}
          <tspan fill="${theme.subtext}" font-size="11" font-weight="500"> days</tspan>
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
        </text>
      </g>
    </g>

    <g transform="translate(200, 120)">
      <rect width="230" height="55" rx="12" fill="${theme.surfaceAlt}" opacity="0.8" filter="url(#shadow-sm-${id})"/>

      <g transform="translate(20, 12)">
        <text fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" font-weight="700">STREAK STATUS</text>
        <g transform="translate(0, 18)">
          ${streakData.current > 0 ? `
            <circle cx="8" cy="8" r="6" fill="#3fb950">
              <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="8" cy="8" r="6" fill="#3fb950" opacity="0.3" r="0" filter="url(#glow-${id})">
              <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <text x="22" y="12" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="700">Active</text>
          ` : `
            <circle cx="8" cy="8" r="6" fill="#f85149"/>
            <text x="22" y="12" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="700">Inactive</text>
          `}
        </g>
      </g>

      <g transform="translate(130, 12)">
        <text fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" font-weight="700">TOTAL ACTIVE</text>
        <text y="30" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="17" font-weight="700">
          ${Math.min(stats.repos.length * 3, 365)} days
          <animate attributeName="opacity" from="0" to="1" dur="0.7s" fill="freeze"/>
        </text>
      </g>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

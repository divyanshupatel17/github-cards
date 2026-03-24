import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats, estimateWeeklyActivity } from "@/lib/github";
import { formatNumber, wrapSvg } from "@/lib/utils";

export function renderActivityCard(stats: GitHubStats, theme: Theme): string {
  const width = 450;
  const height = 200;
  const id = "activity";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const weeklyActivity = estimateWeeklyActivity(stats.repos);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxActivity = Math.max(...weeklyActivity, 1);

  const barWidth = 24;
  const barGap = 10;
  const graphHeight = 55;
  const graphStartX = 45;
  const graphStartY = 150;

  const bars = weeklyActivity.map((val, i) => {
    const h = Math.max((val / maxActivity) * graphHeight, 2);
    const x = graphStartX + i * (barWidth + barGap);
    const y = graphStartY - h;
    const delay = i * 0.1;

    return `
      <g>
        <rect x="${x}" y="${graphStartY}" width="${barWidth}" height="0" rx="4" fill="url(#grad-v-${id})" opacity="0.9">
          <animate attributeName="height" from="0" to="${h}" dur="0.6s" begin="${delay}s" fill="freeze" calcMode="spline" keySplines="0.34 1.56 0.64 1"/>
          <animate attributeName="y" from="${graphStartY}" to="${y}" dur="0.6s" begin="${delay}s" fill="freeze" calcMode="spline" keySplines="0.34 1.56 0.64 1"/>
          <animate attributeName="opacity" from="0.6" to="1" dur="0.4s" begin="${delay}s" fill="freeze"/>
        </rect>
        <rect x="${x}" y="${graphStartY}" width="${barWidth}" height="0" rx="4" fill="url(#grad-v-${id})" opacity="0.3" filter="url(#glow-${id})">
          <animate attributeName="height" from="0" to="${h}" dur="0.8s" begin="${delay}s" fill="freeze" calcMode="spline" keySplines="0.34 1.56 0.64 1"/>
          <animate attributeName="y" from="${graphStartY}" to="${y}" dur="0.8s" begin="${delay}s" fill="freeze" calcMode="spline" keySplines="0.34 1.56 0.64 1"/>
        </rect>
        <text x="${x + barWidth / 2}" y="${graphStartY + 14}" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="600">
          ${days[i]}
        </text>
        <text x="${x + barWidth / 2}" y="${y - 8}" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" text-anchor="middle" font-weight="700" opacity="0">
          ${val}
          <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${delay + 0.5}s" fill="freeze"/>
        </text>
      </g>
    `;
  }).join("");

  const content = `
    ${bg}

    <g transform="translate(20, 20)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700">
        ${stats.user.name || stats.user.login}
      </text>
      <text x="0" y="20" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12">
        @${stats.user.login}
      </text>
    </g>

    <g transform="translate(20, 55)">
      <rect width="130" height="35" rx="8" fill="${theme.surfaceAlt}" opacity="0.8" filter="url(#shadow-sm-${id})"/>
      <text x="12" y="15" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" font-weight="600">REPOSITORIES</text>
      <text x="12" y="28" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="700">
        ${stats.user.public_repos}
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze"/>
      </text>
    </g>

    <g transform="translate(160, 55)">
      <rect width="90" height="35" rx="8" fill="${theme.surfaceAlt}" opacity="0.8" filter="url(#shadow-sm-${id})"/>
      <text x="12" y="15" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" font-weight="600">STARS</text>
      <text x="12" y="28" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="700">
        ${formatNumber(stats.totalStars)}
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" fill="freeze"/>
      </text>
    </g>

    <g transform="translate(260, 55)">
      <rect width="90" height="35" rx="8" fill="${theme.surfaceAlt}" opacity="0.8" filter="url(#shadow-sm-${id})"/>
      <text x="12" y="15" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" font-weight="600">FOLLOWERS</text>
      <text x="12" y="28" fill="${theme.gradient[1]}" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="700">
        ${formatNumber(stats.user.followers)}
        <animate attributeName="opacity" from="0" to="1" dur="0.7s" fill="freeze"/>
      </text>
    </g>

    <g transform="translate(360, 55)">
      <rect width="70" height="35" rx="8" fill="${theme.surfaceAlt}" opacity="0.8" filter="url(#shadow-sm-${id})"/>
      <text x="12" y="15" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" font-weight="600">FORKS</text>
      <text x="12" y="28" fill="${theme.gradient[2]}" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="700">
        ${formatNumber(stats.totalForks)}
        <animate attributeName="opacity" from="0" to="1" dur="0.8s" fill="freeze"/>
      </text>
    </g>

    <line x1="${graphStartX}" y1="${graphStartY - graphHeight - 5}" x2="${graphStartX}" y2="${graphStartY}" stroke="${theme.border}" stroke-width="1.5"/>
    <line x1="${graphStartX}" y1="${graphStartY}" x2="${graphStartX + 7 * (barWidth + barGap)}" y2="${graphStartY}" stroke="${theme.border}" stroke-width="1.5"/>

    <text x="${graphStartX - 15}" y="${graphStartY - graphHeight - 2}" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="8" text-anchor="end" font-weight="600">${maxActivity}</text>
    <text x="${graphStartX - 15}" y="${graphStartY - graphHeight / 2 + 3}" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="8" text-anchor="end">${Math.ceil(maxActivity / 2)}</text>
    <text x="${graphStartX - 15}" y="${graphStartY + 3}" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="8" text-anchor="end">0</text>

    <text x="${graphStartX - 25}" y="${graphStartY + 20}" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="7" text-anchor="middle" opacity="0.6">Contributions</text>

    <text x="20" y="105" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" font-weight="600">
      WEEKLY ACTIVITY
    </text>

    ${bars}

    <g transform="translate(315, 100)">
      <rect width="115" height="75" rx="10" fill="${theme.surfaceAlt}" opacity="0.5"/>
      <text x="12" y="18" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" font-weight="500">ACTIVITY SCORE</text>
      <text x="57" y="52" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="24" font-weight="700" text-anchor="middle" filter="url(#glow-${id})">
        ${weeklyActivity.reduce((a, b) => a + b, 0)}
        <animate attributeName="opacity" from="0" to="1" dur="0.8s" fill="freeze"/>
      </text>
      <text x="57" y="66" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" text-anchor="middle">this week</text>
    </g>

    <g transform="translate(${width - 45}, 20)">
      <circle cx="10" cy="10" r="8" fill="${theme.accent}" opacity="0.2">
        <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="10" cy="10" r="4" fill="${theme.accent}">
        <animate attributeName="opacity" values="1;0.6;1" dur="1s" repeatCount="indefinite"/>
      </circle>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

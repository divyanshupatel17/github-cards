import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats } from "@/lib/github";
import { wrapSvg } from "@/lib/utils";

export function renderHeatmapCard(stats: GitHubStats, theme: Theme, period: string = "month"): string {
  const width = 450;
  const height = 180;
  const id = "heatmap";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  let weeks: number;
  let periodLabel: string;

  switch (period) {
    case "week":
      weeks = 1;
      periodLabel = "This Week";
      break;
    case "year":
      weeks = 52;
      periodLabel = "This Year";
      break;
    default:
      weeks = 12;
      periodLabel = "Last 3 Months";
  }

  const days = 7;
  const cellSize = period === "year" ? 6 : 12;
  const cellGap = period === "year" ? 2 : 3;
  const startX = 55;
  const startY = 60;

  const activityMap = new Map<string, number>();
  stats.repos.forEach(repo => {
    const date = new Date(repo.pushed_at).toDateString();
    activityMap.set(date, (activityMap.get(date) || 0) + 1);
  });

  const now = new Date();
  const cells: string[] = [];
  let totalActivity = 0;
  let activeDays = 0;

  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < days; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      const dateStr = date.toDateString();
      const activity = activityMap.get(dateStr) || 0;

      if (activity > 0) {
        totalActivity += activity;
        activeDays++;
      }

      const x = startX + (weeks - 1 - w) * (cellSize + cellGap);
      const y = startY + d * (cellSize + cellGap);

      let fill: string;
      let opacity: number;

      if (activity === 0) {
        fill = theme.surfaceAlt;
        opacity = 0.4;
      } else if (activity === 1) {
        fill = theme.gradient[2];
        opacity = 0.6;
      } else if (activity <= 3) {
        fill = theme.gradient[1];
        opacity = 0.8;
      } else {
        fill = theme.gradient[0];
        opacity = 1;
      }

      const delay = ((weeks - 1 - w) * days + d) * (period === "year" ? 0.002 : 0.015);

      cells.push(`
        <g>
          <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="${period === "year" ? 1 : 2}"
            fill="${fill}" opacity="0" filter="url(#shadow-sm-${id})">
            <animate attributeName="opacity" from="0" to="${opacity}" dur="0.25s" begin="${delay}s" fill="freeze"/>
          </rect>
          ${activity > 0 ? `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="${period === "year" ? 1 : 2}"
            fill="${fill}" opacity="0.35" filter="url(#glow-${id})">
            <animate attributeName="opacity" from="0.35" to="0" dur="2s" begin="${delay}s" repeatCount="indefinite"/>
          </rect>` : ""}
        </g>
      `);
    }
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const content = `
    ${bg}

    <g transform="translate(20, 20)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700">
        Activity Heatmap
      </text>
      <text x="0" y="20" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        @${stats.user.login} · ${periodLabel}
      </text>
    </g>

    <g transform="translate(${width - 140}, 15)">
      <rect width="120" height="30" rx="8" fill="${theme.surfaceAlt}" opacity="0.8" filter="url(#shadow-sm-${id})"/>
      <text x="15" y="13" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="8" font-weight="600">ACTIVE DAYS</text>
      <text x="15" y="25" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="700">
        ${activeDays}
        <tspan fill="${theme.subtext}" font-size="9" font-weight="400"> / ${weeks * 7}</tspan>
      </text>
    </g>

    ${period !== "year" ? dayLabels.map((label, i) => `
      <text x="${startX - 12}" y="${startY + i * (cellSize + cellGap) + cellSize / 2 + 3}"
        fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="8"
        text-anchor="end" font-weight="600">${label.slice(0, 2)}</text>
    `).join("") : ""}

    ${cells.join("")}

    <g transform="translate(20, ${height - 25})">
      <text fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9">Less</text>

      <rect x="30" y="-8" width="14" height="14" rx="3" fill="${theme.surfaceAlt}" opacity="0.4"/>
      <rect x="48" y="-8" width="14" height="14" rx="3" fill="${theme.gradient[2]}" opacity="0.6"/>
      <rect x="66" y="-8" width="14" height="14" rx="3" fill="${theme.gradient[1]}" opacity="0.8"/>
      <rect x="84" y="-8" width="14" height="14" rx="3" fill="${theme.gradient[0]}"/>

      <text x="105" y="0" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9">More</text>

      <text x="180" y="0" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" font-weight="600">
        ${totalActivity} contributions
      </text>

      <g transform="translate(310, -8)">
        <rect width="60" height="18" rx="9" fill="url(#grad-${id})" opacity="0.2"/>
        <circle cx="12" cy="9" r="4" fill="${theme.accent}">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <text x="22" y="13" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" font-weight="600">
          ${Math.round((activeDays / (weeks * 7)) * 100)}%
        </text>
      </g>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

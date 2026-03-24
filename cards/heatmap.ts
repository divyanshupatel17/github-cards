import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats } from "@/lib/github";
import { wrapSvg } from "@/lib/utils";

export function renderHeatmapCard(stats: GitHubStats, theme: Theme): string {
  const width = 420;
  const height = 160;
  const id = "heatmap";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const weeks = 15;
  const days = 7;
  const cellSize = 14;
  const cellGap = 3;
  const startX = 24;
  const startY = 55;

  const activityMap = new Map<string, number>();
  stats.repos.forEach(repo => {
    const date = new Date(repo.pushed_at).toDateString();
    activityMap.set(date, (activityMap.get(date) || 0) + 1);
  });

  const now = new Date();
  const cells: string[] = [];

  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < days; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      const dateStr = date.toDateString();
      const activity = activityMap.get(dateStr) || 0;

      const x = startX + (weeks - 1 - w) * (cellSize + cellGap);
      const y = startY + d * (cellSize + cellGap);

      let fill: string;
      let opacity: number;

      if (activity === 0) {
        fill = theme.surfaceAlt;
        opacity = 0.3;
      } else if (activity === 1) {
        fill = theme.gradient[2];
        opacity = 0.5;
      } else if (activity <= 3) {
        fill = theme.gradient[1];
        opacity = 0.7;
      } else {
        fill = theme.gradient[0];
        opacity = 1;
      }

      const delay = ((weeks - 1 - w) * days + d) * 0.01;

      cells.push(`
        <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="3"
          fill="${fill}" opacity="0">
          <animate attributeName="opacity" from="0" to="${opacity}" dur="0.3s" begin="${delay}s" fill="freeze"/>
        </rect>
      `);
    }
  }

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  const content = `
    ${bg}

    <g transform="translate(24, 20)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="700">
        Activity Heatmap
      </text>
      <text x="0" y="18" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        @${stats.user.login} · Last ${weeks} weeks
      </text>
    </g>

    <g transform="translate(-10, 0)">
      ${dayLabels.map((label, i) => `
        <text x="20" y="${startY + i * (cellSize + cellGap) + cellSize / 2 + 4}"
          fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9"
          text-anchor="end">${label}</text>
      `).join("")}
    </g>

    ${cells.join("")}

    <g transform="translate(${width - 100}, 135)">
      <text x="0" y="0" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9">
        Less
      </text>
      <rect x="25" y="-8" width="12" height="12" rx="2" fill="${theme.surfaceAlt}" opacity="0.3"/>
      <rect x="40" y="-8" width="12" height="12" rx="2" fill="${theme.gradient[2]}" opacity="0.5"/>
      <rect x="55" y="-8" width="12" height="12" rx="2" fill="${theme.gradient[1]}" opacity="0.7"/>
      <rect x="70" y="-8" width="12" height="12" rx="2" fill="${theme.gradient[0]}"/>
      <text x="88" y="0" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9">
        More
      </text>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

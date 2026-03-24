import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats, calculateGrowth } from "@/lib/github";
import { formatNumber, wrapSvg, scaleValues } from "@/lib/utils";

export function renderGrowthCard(stats: GitHubStats, theme: Theme): string {
  const width = 450;
  const height = 200;
  const id = "growth";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);
  const growth = calculateGrowth(stats.repos);

  const graphW = 170;
  const graphH = 70;
  const graphPadding = 25;

  const renderGraph = (
    data: number[],
    startX: number,
    title: string,
    total: string,
    color: string,
    gradId: string
  ) => {
    const maxVal = Math.max(...data, 1);
    const scaled = scaleValues(data, graphH - 10);
    const step = (graphW - graphPadding) / (data.length - 1 || 1);

    const points = scaled.map((h, i) => `${graphPadding + i * step},${graphH - h}`).join(" ");
    const areaPoints = `${graphPadding},${graphH} ${points} ${graphPadding + (data.length - 1) * step},${graphH}`;

    const pathD = scaled.map((h, i) => {
      const x = graphPadding + i * step;
      const y = graphH - h;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(" ");

    const dots = scaled.map((h, i) => {
      const x = graphPadding + i * step;
      const y = graphH - h;
      const delay = 0.8 + i * 0.12;
      return `
        <circle cx="${x}" cy="${y}" r="0" fill="${theme.surface}" stroke="${color}" stroke-width="2.5">
          <animate attributeName="r" from="0" to="5" dur="0.35s" begin="${delay}s" fill="freeze"/>
        </circle>
        <circle cx="${x}" cy="${y}" r="0" fill="${color}" opacity="0.3">
          <animate attributeName="r" from="0" to="8" dur="0.5s" begin="${delay}s" fill="freeze"/>
        </circle>
      `;
    }).join("");

    const yLabels = [0, Math.round(maxVal / 2), maxVal].map((val, i) => {
      const y = graphH - (i * graphH / 2);
      return `<text x="${graphPadding - 8}" y="${y + 3}" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="8" text-anchor="end" font-weight="500">${formatNumber(val)}</text>`;
    }).join("");

    const xLabels = growth.months.slice(0, data.length).map((m, i) => {
      const x = graphPadding + i * step;
      return `<text x="${x}" y="${graphH + 15}" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="8" text-anchor="middle" font-weight="500">${m}</text>`;
    }).join("");

    return `
      <g transform="translate(${startX}, 50)">
        <rect width="${graphW + 20}" height="${graphH + 60}" rx="10" fill="${theme.surfaceAlt}" opacity="0.5" filter="url(#shadow-sm-${id})"/>

        <text x="12" y="18" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="700">${title}</text>

        <g transform="translate(10, 25)">
          <line x1="${graphPadding}" y1="0" x2="${graphPadding}" y2="${graphH}" stroke="${theme.border}" stroke-width="1.5"/>
          <line x1="${graphPadding}" y1="${graphH}" x2="${graphW}" y2="${graphH}" stroke="${theme.border}" stroke-width="1.5"/>

          ${yLabels}
          ${xLabels}

          <polygon points="${areaPoints}" fill="url(#grad-v-${gradId})" opacity="0.2">
            <animate attributeName="opacity" from="0" to="0.2" dur="0.9s" fill="freeze"/>
          </polygon>

          <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="500" stroke-dashoffset="500">
            <animate attributeName="stroke-dashoffset" from="500" to="0" dur="1.2s" fill="freeze"/>
          </path>

          ${dots}
        </g>

        <text x="${(graphW + 20) / 2}" y="${graphH + 57}" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">
          ${total}
        </text>
      </g>
    `;
  };

  const content = `
    ${bg}

    <g transform="translate(20, 15)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="700">
        Growth Analytics
      </text>
      <text x="0" y="18" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        @${stats.user.login} · Last 6 months
      </text>
    </g>

    ${renderGraph(growth.starsData, 15, "Stars Growth", `${formatNumber(stats.totalStars)} total`, theme.gradient[0], id)}
    ${renderGraph(growth.reposData, 225, "Repo Growth", `${stats.repos.length} repos`, theme.gradient[1], id)}
  `;

  return wrapSvg(content, width, height, defs);
}

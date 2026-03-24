import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats } from "@/lib/github";
import { wrapSvg } from "@/lib/utils";

export function renderRadarCard(stats: GitHubStats, theme: Theme): string {
  const width = 450;
  const height = 280;
  const id = "radar";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const cx = 225;
  const cy = 155;
  const maxR = 85;

  const recentActivity = stats.repos.filter(r => {
    const d = new Date(r.pushed_at);
    const now = new Date();
    return (now.getTime() - d.getTime()) < 30 * 24 * 60 * 60 * 1000;
  }).length;

  const metrics = [
    { label: "Repos", value: Math.min(stats.user.public_repos / 50, 1), raw: stats.user.public_repos },
    { label: "Stars", value: Math.min(stats.totalStars / 500, 1), raw: stats.totalStars },
    { label: "Forks", value: Math.min(stats.totalForks / 200, 1), raw: stats.totalForks },
    { label: "Followers", value: Math.min(stats.user.followers / 200, 1), raw: stats.user.followers },
    { label: "Activity", value: Math.min(recentActivity / 10, 1), raw: recentActivity },
    { label: "Languages", value: Math.min(stats.languages.length / 6, 1), raw: stats.languages.length },
  ];

  const angleStep = (2 * Math.PI) / metrics.length;
  const startAngle = -Math.PI / 2;

  const gridLines = [0.25, 0.5, 0.75, 1].map(level => {
    const points = metrics.map((_, i) => {
      const angle = startAngle + i * angleStep;
      const r = maxR * level;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
    return `<polygon points="${points}" fill="none" stroke="${theme.border}" stroke-width="1" opacity="${0.15 + level * 0.15}"/>`;
  }).join("");

  const axisLines = metrics.map((_, i) => {
    const angle = startAngle + i * angleStep;
    const x = cx + maxR * Math.cos(angle);
    const y = cy + maxR * Math.sin(angle);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${theme.border}" stroke-width="1" opacity="0.2"/>`;
  }).join("");

  const dataPoints = metrics.map((m, i) => {
    const angle = startAngle + i * angleStep;
    const r = maxR * Math.max(m.value, 0.1);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");

  const labels = metrics.map((m, i) => {
    const angle = startAngle + i * angleStep;
    const r = maxR + 30;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const anchor = Math.abs(Math.cos(angle)) < 0.3 ? "middle" :
                   Math.cos(angle) > 0 ? "start" : "end";

    return `
      <g>
        <text x="${x}" y="${y - 6}" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif"
          font-size="11" font-weight="600" text-anchor="${anchor}">
          ${m.label}
        </text>
        <text x="${x}" y="${y + 6}" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif"
          font-size="10" font-weight="700" text-anchor="${anchor}">
          ${m.raw}
        </text>
      </g>
    `;
  }).join("");

  const dots = metrics.map((m, i) => {
    const angle = startAngle + i * angleStep;
    const r = maxR * Math.max(m.value, 0.1);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `
      <circle cx="${x}" cy="${y}" r="0" fill="${theme.accent}" filter="url(#glow-${id})">
        <animate attributeName="r" from="0" to="6" dur="0.4s" begin="${0.6 + i * 0.12}s" fill="freeze"/>
      </circle>
      <circle cx="${x}" cy="${y}" r="0" fill="${theme.accent}" opacity="0.2" r="0">
        <animate attributeName="r" from="0" to="10" dur="0.6s" begin="${0.6 + i * 0.12}s" fill="freeze"/>
      </circle>
      <circle cx="${x}" cy="${y}" r="0" fill="${theme.surface}" stroke="${theme.accent}" stroke-width="2.5">
        <animate attributeName="r" from="0" to="3" dur="0.35s" begin="${0.6 + i * 0.12}s" fill="freeze"/>
      </circle>
    `;
  }).join("");

  const content = `
    ${bg}

    <g transform="translate(20, 20)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700">
        Developer Radar
      </text>
      <text x="0" y="20" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        @${stats.user.login} · Skills Overview
      </text>
    </g>

    <g>
      ${gridLines}
      ${axisLines}

      <polygon points="${dataPoints}" fill="url(#grad-${id})" opacity="0" stroke="url(#grad-${id})" stroke-width="2.5" stroke-linejoin="round">
        <animate attributeName="opacity" from="0" to="0.25" dur="0.8s" fill="freeze"/>
      </polygon>

      <polygon points="${dataPoints}" fill="none" stroke="url(#grad-${id})" stroke-width="2.5" stroke-linejoin="round" stroke-dasharray="500" stroke-dashoffset="500">
        <animate attributeName="stroke-dashoffset" from="500" to="0" dur="1s" fill="freeze"/>
      </polygon>

      ${dots}
      ${labels}

      <circle cx="${cx}" cy="${cy}" r="4" fill="${theme.accent}">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
      </circle>
    </g>

    <g transform="translate(${cx}, ${cy})">
      <circle r="${maxR + 8}" fill="none" stroke="url(#grad-${id})" stroke-width="1" opacity="0.2" stroke-dasharray="6 4">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="30s" repeatCount="indefinite"/>
      </circle>
    </g>

    <text x="${cx}" y="${height - 15}" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9" text-anchor="middle">
      Overall Score: ${Math.round(metrics.reduce((a, m) => a + m.value, 0) / metrics.length * 100)}%
    </text>
  `;

  return wrapSvg(content, width, height, defs);
}

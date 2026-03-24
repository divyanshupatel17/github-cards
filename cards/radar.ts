import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats } from "@/lib/github";
import { wrapSvg, formatNumber } from "@/lib/utils";

export function renderRadarCard(stats: GitHubStats, theme: Theme): string {
  const width = 420;
  const height = 300;
  const id = "radar";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const cx = 210;
  const cy = 165;
  const maxR = 90;

  const metrics = [
    { label: "Repos", value: Math.min(stats.user.public_repos / 50, 1) },
    { label: "Stars", value: Math.min(stats.totalStars / 500, 1) },
    { label: "Forks", value: Math.min(stats.totalForks / 200, 1) },
    { label: "Followers", value: Math.min(stats.user.followers / 200, 1) },
    { label: "Activity", value: Math.min(stats.repos.filter(r => {
      const d = new Date(r.pushed_at);
      const now = new Date();
      return (now.getTime() - d.getTime()) < 30 * 24 * 60 * 60 * 1000;
    }).length / 10, 1) },
    { label: "Languages", value: Math.min(stats.languages.length / 6, 1) },
  ];

  const angleStep = (2 * Math.PI) / metrics.length;
  const startAngle = -Math.PI / 2;

  const gridLines = [0.25, 0.5, 0.75, 1].map(level => {
    const points = metrics.map((_, i) => {
      const angle = startAngle + i * angleStep;
      const r = maxR * level;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
    return `<polygon points="${points}" fill="none" stroke="${theme.border}" stroke-width="1" opacity="${0.2 + level * 0.2}"/>`;
  }).join("");

  const axisLines = metrics.map((_, i) => {
    const angle = startAngle + i * angleStep;
    const x = cx + maxR * Math.cos(angle);
    const y = cy + maxR * Math.sin(angle);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${theme.border}" stroke-width="1" opacity="0.3"/>`;
  }).join("");

  const dataPoints = metrics.map((m, i) => {
    const angle = startAngle + i * angleStep;
    const r = maxR * m.value;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");

  const labels = metrics.map((m, i) => {
    const angle = startAngle + i * angleStep;
    const r = maxR + 25;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const anchor = Math.abs(angle) < 0.1 || Math.abs(angle - Math.PI) < 0.1 ? "middle" :
                   angle > -Math.PI / 2 && angle < Math.PI / 2 ? "start" : "end";
    return `
      <text x="${x}" y="${y}" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif"
        font-size="10" text-anchor="${anchor}" dominant-baseline="middle">
        ${m.label}
      </text>
    `;
  }).join("");

  const dots = metrics.map((m, i) => {
    const angle = startAngle + i * angleStep;
    const r = maxR * m.value;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `
      <circle cx="${x}" cy="${y}" r="4" fill="${theme.accent}" filter="url(#glow-${id})">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="${i * 0.3}s"/>
      </circle>
    `;
  }).join("");

  const content = `
    ${bg}

    <g transform="translate(24, 20)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" font-weight="700">
        Developer Radar
      </text>
      <text x="0" y="18" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        @${stats.user.login} · Skills Overview
      </text>
    </g>

    <g>
      ${gridLines}
      ${axisLines}

      <polygon points="${dataPoints}" fill="url(#grad-${id})" opacity="0.3" stroke="url(#grad-${id})" stroke-width="2">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite"/>
      </polygon>

      ${dots}
      ${labels}

      <circle cx="${cx}" cy="${cy}" r="3" fill="${theme.accent}"/>
    </g>

    <g transform="translate(${cx}, ${cy})">
      <circle r="${maxR + 5}" fill="none" stroke="url(#grad-${id})" stroke-width="1" opacity="0.3" stroke-dasharray="4 4">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite"/>
      </circle>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

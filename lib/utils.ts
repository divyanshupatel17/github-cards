import { Theme, createGradientDefs, createCardBackground } from "./theme";

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export function calculatePercentages(
  items: { name: string; value: number }[]
): { name: string; value: number; percent: number }[] {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return items.map((item) => ({ ...item, percent: 0 }));
  return items.map((item) => ({
    ...item,
    percent: Math.round((item.value / total) * 100),
  }));
}

export function scaleValues(values: number[], maxHeight: number): number[] {
  const max = Math.max(...values, 1);
  return values.map((v) => (v / max) * maxHeight);
}

export function wrapSvg(
  content: string,
  width: number,
  height: number,
  defs: string = ""
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">${defs}${content}</svg>`;
}

export function generateBarGraph(
  values: number[],
  width: number,
  height: number,
  theme: Theme,
  id: string,
  animated: boolean = true
): string {
  const barCount = values.length;
  const gap = 6;
  const barWidth = Math.floor((width - (barCount - 1) * gap) / barCount);
  const scaled = scaleValues(values, height - 4);
  const [c1, c2] = theme.gradient;

  return scaled
    .map((h, i) => {
      const x = i * (barWidth + gap);
      const y = height - h;
      const delay = i * 0.1;
      const radius = Math.min(barWidth / 2, 4);

      const animation = animated
        ? `<animate attributeName="height" from="0" to="${h}" dur="0.6s" begin="${delay}s" fill="freeze"/>
           <animate attributeName="y" from="${height}" to="${y}" dur="0.6s" begin="${delay}s" fill="freeze"/>`
        : "";

      return `
        <rect x="${x}" y="${animated ? height : y}" width="${barWidth}" height="${animated ? 0 : h}" rx="${radius}"
          fill="url(#grad-v-${id})" opacity="0.9">
          ${animation}
        </rect>
        <rect x="${x}" y="${y}" width="${barWidth}" height="2" rx="1" fill="${c1}" opacity="0.8"
          filter="url(#glow-${id})"/>
      `;
    })
    .join("");
}

export function generateLineGraph(
  values: number[],
  width: number,
  height: number,
  theme: Theme,
  id: string,
  filled: boolean = true,
  animated: boolean = true
): string {
  if (values.length === 0) return "";

  const padding = 8;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  const scaled = scaleValues(values, graphHeight);
  const step = graphWidth / (values.length - 1 || 1);

  const points = scaled
    .map((h, i) => `${padding + i * step},${padding + graphHeight - h}`)
    .join(" ");

  const pathD = scaled
    .map((h, i) => {
      const x = padding + i * step;
      const y = padding + graphHeight - h;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  const areaPath = `${pathD} L ${padding + graphWidth} ${padding + graphHeight} L ${padding} ${padding + graphHeight} Z`;

  const lineAnimation = animated
    ? `<animate attributeName="stroke-dashoffset" from="1000" to="0" dur="1.5s" fill="freeze"/>`
    : "";

  let svg = "";

  if (filled) {
    svg += `<path d="${areaPath}" fill="url(#grad-v-${id})" opacity="0.15"/>`;
  }

  svg += `
    <path d="${pathD}" fill="none" stroke="url(#grad-h-${id})" stroke-width="3"
      stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1000" stroke-dashoffset="${animated ? 1000 : 0}">
      ${lineAnimation}
    </path>
    <path d="${pathD}" fill="none" stroke="url(#grad-h-${id})" stroke-width="1"
      stroke-linecap="round" filter="url(#glow-${id})" opacity="0.6"/>
  `;

  scaled.forEach((h, i) => {
    const x = padding + i * step;
    const y = padding + graphHeight - h;
    const delay = 1.5 + i * 0.1;

    svg += `
      <circle cx="${x}" cy="${y}" r="4" fill="${theme.surface}" stroke="url(#grad-${id})" stroke-width="2">
        ${animated ? `<animate attributeName="r" from="0" to="4" dur="0.3s" begin="${delay}s" fill="freeze"/>` : ""}
      </circle>
    `;
  });

  return svg;
}

export function generateCircularProgress(
  percent: number,
  cx: number,
  cy: number,
  radius: number,
  strokeWidth: number,
  theme: Theme,
  id: string,
  animated: boolean = true
): string {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const animation = animated
    ? `<animate attributeName="stroke-dashoffset" from="${circumference}" to="${offset}" dur="1s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>`
    : "";

  return `
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none"
      stroke="${theme.surfaceAlt}" stroke-width="${strokeWidth}" opacity="0.5"/>
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none"
      stroke="url(#grad-${id})" stroke-width="${strokeWidth}"
      stroke-dasharray="${circumference}" stroke-dashoffset="${animated ? circumference : offset}"
      stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"
      filter="url(#glow-${id})">
      ${animation}
    </circle>
    <circle cx="${cx}" cy="${cy}" r="${radius - strokeWidth - 2}" fill="none"
      stroke="${theme.gradient[0]}" stroke-width="1" opacity="0.2"/>
  `;
}

export function generateGridBackground(
  width: number,
  height: number,
  theme: Theme,
  id: string
): string {
  return `<rect x="0" y="0" width="${width}" height="${height}" fill="url(#grid-${id})" opacity="0.5"/>`;
}

export function generateDotsBackground(
  width: number,
  height: number,
  id: string
): string {
  return `<rect x="0" y="0" width="${width}" height="${height}" fill="url(#dots-${id})" opacity="0.5"/>`;
}

export function generateStatBox(
  x: number,
  y: number,
  width: number,
  height: number,
  label: string,
  value: string,
  theme: Theme,
  id: string
): string {
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${width}" height="${height}" rx="8"
        fill="${theme.surfaceAlt}" opacity="0.5"/>
      <rect x="0" y="0" width="${width}" height="${height}" rx="8"
        fill="none" stroke="${theme.border}" stroke-width="1" opacity="0.5"/>
      <text x="${width / 2}" y="${height / 2 - 6}" fill="${theme.subtext}"
        font-family="'Segoe UI', system-ui, sans-serif" font-size="10" text-anchor="middle">
        ${label}
      </text>
      <text x="${width / 2}" y="${height / 2 + 10}" fill="${theme.text}"
        font-family="'Segoe UI', system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle">
        ${value}
      </text>
    </g>
  `;
}

export function generateIcon(
  name: string,
  x: number,
  y: number,
  size: number,
  color: string
): string {
  const icons: Record<string, string> = {
    star: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`,
    fork: `<path d="M7 5a2 2 0 012-2h6a2 2 0 012 2v3a2 2 0 01-2 2H9a2 2 0 01-2-2V5zm5 7v5m-3 3h6"/>`,
    commit: `<circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/>`,
    user: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    repo: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`,
    flame: `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>`,
    trending: `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
    code: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
    zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
  };

  const path = icons[name] || icons.star;
  const scale = size / 24;

  return `
    <g transform="translate(${x}, ${y}) scale(${scale})">
      <g fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${path}
      </g>
    </g>
  `;
}

export function generatePulseAnimation(
  cx: number,
  cy: number,
  radius: number,
  color: string
): string {
  return `
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="${color}" opacity="0.6">
      <animate attributeName="r" values="${radius};${radius * 1.5};${radius}" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="${cx}" cy="${cy}" r="${radius * 0.6}" fill="${color}"/>
  `;
}

export function generateSparkline(
  values: number[],
  width: number,
  height: number,
  color: string
): string {
  if (values.length < 2) return "";

  const scaled = scaleValues(values, height - 4);
  const step = width / (values.length - 1);

  const pathD = scaled
    .map((h, i) => {
      const x = i * step;
      const y = height - h - 2;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  return `
    <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `;
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

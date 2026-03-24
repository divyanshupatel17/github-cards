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

export function generateBarGraph(
  values: number[],
  width: number,
  height: number,
  color: string,
  gradientId?: string
): string {
  const barCount = values.length;
  const barWidth = Math.floor((width - (barCount - 1) * 4) / barCount);
  const scaled = scaleValues(values, height);

  return scaled
    .map((h, i) => {
      const x = i * (barWidth + 4);
      const y = height - h;
      const fill = gradientId ? `url(#${gradientId})` : color;
      return `<rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="2" fill="${fill}" opacity="0.9"/>`;
    })
    .join("");
}

export function generateLineGraph(
  values: number[],
  width: number,
  height: number,
  color: string,
  filled: boolean = false
): string {
  if (values.length === 0) return "";
  const scaled = scaleValues(values, height - 10);
  const step = width / (values.length - 1 || 1);
  const points = scaled.map((h, i) => `${i * step},${height - h - 5}`).join(" ");

  let svg = `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

  if (filled) {
    const areaPoints = `0,${height} ${points} ${width},${height}`;
    svg =
      `<polygon points="${areaPoints}" fill="${color}" opacity="0.1"/>` + svg;
  }

  scaled.forEach((h, i) => {
    svg += `<circle cx="${i * step}" cy="${height - h - 5}" r="3" fill="${color}"/>`;
  });

  return svg;
}

export function generateCircularProgress(
  percent: number,
  cx: number,
  cy: number,
  radius: number,
  strokeWidth: number,
  bgColor: string,
  fgColor: string,
  gradientId?: string
): string {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const fill = gradientId ? `url(#${gradientId})` : fgColor;

  return `
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${bgColor}" stroke-width="${strokeWidth}"/>
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${fill}" stroke-width="${strokeWidth}"
      stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round"
      transform="rotate(-90 ${cx} ${cy})"/>
  `;
}

export function generateGridBackground(
  width: number,
  height: number,
  color: string,
  spacing: number = 20
): string {
  let lines = "";
  for (let x = 0; x <= width; x += spacing) {
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${color}" stroke-width="0.5" opacity="0.3"/>`;
  }
  for (let y = 0; y <= height; y += spacing) {
    lines += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${color}" stroke-width="0.5" opacity="0.3"/>`;
  }
  return lines;
}

export function wrapSvg(
  content: string,
  width: number,
  height: number,
  defs: string = ""
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${defs}${content}</svg>`;
}

export function createCard(
  width: number,
  height: number,
  bgColor: string,
  borderColor: string,
  rx: number = 12
): string {
  return `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${rx}" fill="${bgColor}" stroke="${borderColor}" stroke-width="1"/>`;
}

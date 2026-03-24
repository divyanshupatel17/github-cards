import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubStats } from "@/lib/github";
import { wrapSvg, formatNumber } from "@/lib/utils";

export function renderStatsCard(stats: GitHubStats, theme: Theme): string {
  const width = 450;
  const height = 195;
  const id = "stats";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const totalScore = stats.repos.length * 2 + stats.totalStars * 3 + stats.user.followers * 2 + stats.totalForks;
  const maxScore = 2000;
  const progressPercent = Math.min((totalScore / maxScore) * 100, 100);

  const rank = totalScore > 1500 ? "S" :
               totalScore > 1000 ? "A+" :
               totalScore > 500 ? "A" :
               totalScore > 200 ? "B+" :
               totalScore > 100 ? "B" : "C";

  const rankColor = rank === "S" ? "#ffd700" :
                    rank === "A+" ? theme.gradient[0] :
                    rank === "A" ? theme.gradient[1] :
                    theme.accent;

  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressPercent / 100) * circumference;

  const statItems = [
    { label: "Total Stars", value: formatNumber(stats.totalStars), color: theme.gradient[0] },
    { label: "Repositories", value: stats.user.public_repos.toString(), color: theme.gradient[1] },
    { label: "Total Forks", value: formatNumber(stats.totalForks), color: theme.gradient[2] },
    { label: "Followers", value: formatNumber(stats.user.followers), color: theme.accent },
  ];

  const content = `
    ${bg}

    <g transform="translate(20, 20)">
      <text fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700">
        ${stats.user.name || stats.user.login}'s Stats
      </text>
      <text x="0" y="20" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        @${stats.user.login}
      </text>
    </g>

    <g transform="translate(20, 55)">
      ${statItems.map((item, i) => {
        const y = i * 30;
        const barWidth = 120;
        const fillWidth = Math.min((parseInt(item.value.replace(/[^\d]/g, "")) || 0) / 100, 1) * barWidth;

        return `
          <g transform="translate(0, ${y})">
            <circle cx="8" cy="10" r="5" fill="${item.color}" opacity="0.2">
              <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" begin="${i * 0.2}s"/>
            </circle>
            <circle cx="8" cy="10" r="3" fill="${item.color}">
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${i * 0.1}s" fill="freeze"/>
            </circle>

            <text x="22" y="14" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600">
              ${item.label}
            </text>

            <text x="200" y="14" fill="${item.color}" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="800" text-anchor="end">
              ${item.value}
              <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="${i * 0.1}s" fill="freeze"/>
            </text>
          </g>
        `;
      }).join("")}
    </g>

    <line x1="230" y1="55" x2="230" y2="175" stroke="${theme.border}" stroke-width="1.5" opacity="0.4"/>

    <g transform="translate(340, 115)">
      <circle cx="0" cy="0" r="${radius}" fill="none" stroke="${theme.surfaceAlt}" stroke-width="${strokeWidth}"/>

      <circle cx="0" cy="0" r="${radius}" fill="none" stroke="${rankColor}" stroke-width="${strokeWidth}"
        stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}" stroke-linecap="round"
        transform="rotate(-90)" filter="url(#glow-${id})">
        <animate attributeName="stroke-dashoffset" from="${circumference}" to="${offset}" dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
      </circle>

      <text x="0" y="-5" fill="${rankColor}" font-family="'Segoe UI', system-ui, sans-serif" font-size="32" font-weight="800" text-anchor="middle" filter="url(#glow-${id})">
        ${rank}
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1s" fill="freeze"/>
      </text>
      <text x="0" y="15" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="500">
        RANK
      </text>

      <text x="0" y="${radius + 25}" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" text-anchor="middle">
        Score: ${Math.round(progressPercent)}%
      </text>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

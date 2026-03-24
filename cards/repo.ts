import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubRepo } from "@/lib/github";
import { formatNumber, wrapSvg, generateIcon } from "@/lib/utils";

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

export function renderRepoCard(repo: GitHubRepo, theme: Theme): string {
  const width = 420;
  const height = 160;
  const id = "repo";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const langColor = languageColors[repo.language || ""] || theme.accent;
  const description = repo.description
    ? repo.description.length > 90
      ? repo.description.slice(0, 87) + "..."
      : repo.description
    : "No description provided";

  const content = `
    ${bg}

    <g transform="translate(24, 24)">
      ${generateIcon("repo", 0, 0, 20, theme.accent)}

      <text x="28" y="14" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700"
        filter="url(#glow-${id})">
        ${repo.name}
      </text>
    </g>

    <g transform="translate(24, 54)">
      <rect x="0" y="0" width="372" height="44" rx="8" fill="${theme.surfaceAlt}" opacity="0.3"/>
      <text x="12" y="26" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12">
        ${description}
      </text>
    </g>

    <g transform="translate(24, 115)">
      ${
        repo.language
          ? `
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="100" height="28" rx="14" fill="${langColor}" opacity="0.15"/>
          <circle cx="16" cy="14" r="5" fill="${langColor}"/>
          <text x="28" y="18" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="500">
            ${repo.language}
          </text>
        </g>
      `
          : ""
      }

      <g transform="translate(${repo.language ? 115 : 0}, 0)">
        <rect x="0" y="0" width="75" height="28" rx="14" fill="${theme.surfaceAlt}" opacity="0.5"/>
        ${generateIcon("star", 10, 6, 14, theme.gradient[0])}
        <text x="30" y="18" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600">
          ${formatNumber(repo.stargazers_count)}
        </text>
      </g>

      <g transform="translate(${repo.language ? 200 : 85}, 0)">
        <rect x="0" y="0" width="75" height="28" rx="14" fill="${theme.surfaceAlt}" opacity="0.5"/>
        ${generateIcon("fork", 10, 6, 14, theme.gradient[1])}
        <text x="30" y="18" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600">
          ${formatNumber(repo.forks_count)}
        </text>
      </g>

      <g transform="translate(${width - 60}, -2)">
        <circle cx="16" cy="16" r="12" fill="url(#grad-${id})" opacity="0.2">
          <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="16" y="20" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="600">
          HOT
        </text>
      </g>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

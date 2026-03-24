import { Theme, createGradientDefs, createCardBackground } from "@/lib/theme";
import { GitHubRepo } from "@/lib/github";
import { formatNumber, wrapSvg } from "@/lib/utils";

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
  const width = 450;
  const height = 170;
  const id = "repo";
  const defs = createGradientDefs(theme, id);
  const bg = createCardBackground(width, height, theme, id);

  const langColor = languageColors[repo.language || ""] || theme.accent;
  const description = repo.description
    ? repo.description.length > 100
      ? repo.description.slice(0, 97) + "..."
      : repo.description
    : "No description provided";

  const content = `
    ${bg}

    <g transform="translate(20, 25)">
      <rect width="28" height="28" rx="8" fill="${theme.surfaceAlt}"/>
      <text x="14" y="20" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="16" text-anchor="middle">
        <tspan fill="url(#grad-${id})">R</tspan>
      </text>

      <text x="40" y="12" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700">
        ${repo.name}
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze"/>
      </text>
      <text x="40" y="26" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="11">
        ${repo.full_name.split("/")[0]}
      </text>
    </g>

    <g transform="translate(20, 65)">
      <rect width="${width - 40}" height="42" rx="10" fill="${theme.surfaceAlt}" opacity="0.5" filter="url(#shadow-sm-${id})"/>
      <text x="15" y="26" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="500">
        ${description}
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" fill="freeze"/>
      </text>
    </g>

    <g transform="translate(20, 125)">
      ${repo.language ? `
        <rect width="95" height="30" rx="15" fill="${langColor}" opacity="0.15"/>
        <circle cx="18" cy="15" r="6" fill="${langColor}">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="32" y="19" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600">
          ${repo.language}
        </text>
      ` : ""}

      <g transform="translate(${repo.language ? 110 : 0}, 0)">
        <rect width="80" height="30" rx="15" fill="${theme.surfaceAlt}"/>
        <circle cx="18" cy="15" r="5" fill="${theme.gradient[0]}"/>
        <text x="30" y="19" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="700">
          ${formatNumber(repo.stargazers_count)}
        </text>
        <text x="65" y="19" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9">stars</text>
      </g>

      <g transform="translate(${repo.language ? 200 : 90}, 0)">
        <rect width="80" height="30" rx="15" fill="${theme.surfaceAlt}"/>
        <circle cx="18" cy="15" r="5" fill="${theme.gradient[1]}"/>
        <text x="30" y="19" fill="${theme.text}" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="700">
          ${formatNumber(repo.forks_count)}
        </text>
        <text x="65" y="19" fill="${theme.subtext}" font-family="'Segoe UI', system-ui, sans-serif" font-size="9">forks</text>
      </g>

      ${repo.stargazers_count > 10 ? `
        <g transform="translate(${width - 75}, 0)">
          <rect width="50" height="30" rx="15" fill="url(#grad-${id})" opacity="0.3"/>
          <text x="25" y="19" fill="${theme.accent}" font-family="'Segoe UI', system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="700">
            HOT
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
          </text>
        </g>
      ` : ""}
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

import { Theme, createGradientDefs } from "@/lib/theme";
import { GitHubRepo } from "@/lib/github";
import { formatNumber, wrapSvg, createCard } from "@/lib/utils";

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
};

export function renderRepoCard(repo: GitHubRepo, theme: Theme): string {
  const width = 400;
  const height = 140;
  const id = "repo";
  const defs = createGradientDefs(theme, id);

  const langColor = languageColors[repo.language || ""] || theme.accent;
  const description = repo.description
    ? repo.description.length > 80
      ? repo.description.slice(0, 77) + "..."
      : repo.description
    : "No description provided";

  const content = `
    ${createCard(width, height, theme.background, theme.border)}

    <g transform="translate(24, 24)">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="${theme.subtext}">
        <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
      </svg>
    </g>

    <text x="48" y="36" fill="${theme.accent}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="16" font-weight="600">
      ${repo.name}
    </text>

    <text x="24" y="60" fill="${theme.subtext}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12">
      ${description}
    </text>

    <g transform="translate(24, 100)">
      ${
        repo.language
          ? `
        <circle cx="6" cy="6" r="6" fill="${langColor}"/>
        <text x="18" y="10" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12">
          ${repo.language}
        </text>
      `
          : ""
      }

      <g transform="translate(${repo.language ? 120 : 0}, 0)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="${theme.subtext}">
          <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
        </svg>
        <text x="22" y="12" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12">
          ${formatNumber(repo.stargazers_count)}
        </text>
      </g>

      <g transform="translate(${repo.language ? 180 : 60}, 0)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="${theme.subtext}">
          <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
        </svg>
        <text x="22" y="12" fill="${theme.text}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12">
          ${formatNumber(repo.forks_count)}
        </text>
      </g>
    </g>
  `;

  return wrapSvg(content, width, height, defs);
}

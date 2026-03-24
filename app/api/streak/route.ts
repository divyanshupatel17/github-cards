import { NextRequest, NextResponse } from "next/server";
import { fetchStats } from "@/lib/github";
import { getTheme } from "@/lib/theme";
import { renderStreakCard } from "@/cards/streak";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const themeName = searchParams.get("theme") || "dark";

  if (!username) {
    return new NextResponse("Missing username parameter", { status: 400 });
  }

  try {
    const stats = await fetchStats(username);
    const theme = getTheme(themeName);
    const svg = renderStreakCard(stats, theme);

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    const theme = getTheme(themeName);
    const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="100">
      <rect width="420" height="100" rx="16" fill="${theme.background}"/>
      <rect x="1" y="1" width="418" height="98" rx="15" fill="${theme.surface}" stroke="${theme.border}"/>
      <text x="210" y="55" fill="#f85149" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">
        Error: Unable to fetch data for ${username}
      </text>
    </svg>`;
    return new NextResponse(errorSvg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}

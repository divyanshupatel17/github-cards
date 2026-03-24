import { NextRequest, NextResponse } from "next/server";
import { fetchStats } from "@/lib/github";
import { getTheme } from "@/lib/theme";
import { renderActivityCard } from "@/cards/activity";
import { renderStreakCard } from "@/cards/streak";
import { renderGrowthCard } from "@/cards/growth";
import { renderTechCard } from "@/cards/tech";
import { renderRepoCard } from "@/cards/repo";

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

    const activitySvg = renderActivityCard(stats, theme);
    const streakSvg = renderStreakCard(stats, theme);
    const growthSvg = renderGrowthCard(stats, theme);
    const techSvg = renderTechCard(stats, theme);
    const repoSvg = stats.topRepos[0] ? renderRepoCard(stats.topRepos[0], theme) : "";

    const extractInner = (svg: string) => {
      const match = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
      return match ? match[1] : "";
    };

    const width = 820;
    const height = 580;
    const gap = 20;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="${theme.background}"/>
      <g transform="translate(0, 0)">
        <svg width="400" height="200" viewBox="0 0 400 200">${extractInner(activitySvg)}</svg>
      </g>
      <g transform="translate(${400 + gap}, 0)">
        <svg width="400" height="180" viewBox="0 0 400 180">${extractInner(streakSvg)}</svg>
      </g>
      <g transform="translate(0, ${200 + gap})">
        <svg width="400" height="180" viewBox="0 0 400 180">${extractInner(growthSvg)}</svg>
      </g>
      <g transform="translate(${400 + gap}, ${180 + gap})">
        <svg width="400" height="180" viewBox="0 0 400 180">${extractInner(techSvg)}</svg>
      </g>
      <g transform="translate(${(width - 400) / 2}, ${380 + gap})">
        <svg width="400" height="140" viewBox="0 0 400 140">${extractInner(repoSvg)}</svg>
      </g>
    </svg>`;

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
      <rect width="400" height="100" rx="12" fill="#0d1117" stroke="#30363d"/>
      <text x="200" y="55" fill="#f85149" font-family="sans-serif" font-size="14" text-anchor="middle">
        Error: Unable to fetch data for ${username}
      </text>
    </svg>`;
    return new NextResponse(errorSvg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { fetchStats } from "@/lib/github";
import { getTheme, createGradientDefs, createCardBackground } from "@/lib/theme";
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

    const cardW = 450;
    const gap = 15;
    const padding = 20;

    const width = cardW * 2 + gap + padding * 2;
    const height = 200 + 200 + 170 + gap * 2 + padding * 2;

    const defs = createGradientDefs(theme, "all");
    const bg = createCardBackground(width, height, theme, "all");

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      ${defs}
      ${bg}

      <g transform="translate(${padding}, ${padding})">
        <svg width="${cardW}" height="200" viewBox="0 0 ${cardW} 200">${extractInner(activitySvg)}</svg>
      </g>

      <g transform="translate(${padding + cardW + gap}, ${padding})">
        <svg width="${cardW}" height="195" viewBox="0 0 ${cardW} 195">${extractInner(streakSvg)}</svg>
      </g>

      <g transform="translate(${padding}, ${padding + 200 + gap})">
        <svg width="${cardW}" height="200" viewBox="0 0 ${cardW} 200">${extractInner(growthSvg)}</svg>
      </g>

      <g transform="translate(${padding + cardW + gap}, ${padding + 200 + gap})">
        <svg width="${cardW}" height="200" viewBox="0 0 ${cardW} 200">${extractInner(techSvg)}</svg>
      </g>

      <g transform="translate(${padding + (cardW + gap) / 2}, ${padding + 200 + 200 + gap * 2})">
        <svg width="${cardW}" height="170" viewBox="0 0 ${cardW} 170">${extractInner(repoSvg)}</svg>
      </g>
    </svg>`;

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    const theme = getTheme(themeName);
    const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="450" height="100">
      <rect width="450" height="100" rx="16" fill="${theme.background}"/>
      <rect x="1" y="1" width="448" height="98" rx="15" fill="${theme.surface}" stroke="${theme.border}"/>
      <text x="225" y="55" fill="#f85149" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">
        Error: Unable to fetch data for ${username}
      </text>
    </svg>`;
    return new NextResponse(errorSvg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}

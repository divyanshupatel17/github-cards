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

    const cardW = 420;
    const cardH1 = 220;
    const cardH2 = 200;
    const cardH3 = 160;
    const gap = 16;
    const padding = 20;

    const width = cardW * 2 + gap + padding * 2;
    const height = cardH1 + cardH2 + cardH3 + gap * 2 + padding * 2;

    const defs = createGradientDefs(theme, "all");
    const bg = createCardBackground(width, height, theme, "all");

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      ${defs}
      ${bg}

      <g transform="translate(${padding}, ${padding})">
        <svg width="${cardW}" height="${cardH1}" viewBox="0 0 ${cardW} ${cardH1}">${extractInner(activitySvg)}</svg>
      </g>

      <g transform="translate(${padding + cardW + gap}, ${padding})">
        <svg width="${cardW}" height="${cardH2}" viewBox="0 0 ${cardW} ${cardH2}">${extractInner(streakSvg)}</svg>
      </g>

      <g transform="translate(${padding}, ${padding + cardH1 + gap})">
        <svg width="${cardW}" height="${cardH2}" viewBox="0 0 ${cardW} ${cardH2}">${extractInner(growthSvg)}</svg>
      </g>

      <g transform="translate(${padding + cardW + gap}, ${padding + cardH1 + gap})">
        <svg width="${cardW}" height="${cardH2}" viewBox="0 0 ${cardW} 220">${extractInner(techSvg)}</svg>
      </g>

      <g transform="translate(${padding + (cardW + gap) / 2}, ${padding + cardH1 + cardH2 + gap * 2})">
        <svg width="${cardW}" height="${cardH3}" viewBox="0 0 ${cardW} ${cardH3}">${extractInner(repoSvg)}</svg>
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

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  html_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubStats {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  totalForks: number;
  languages: { name: string; value: number }[];
  topRepos: GitHubRepo[];
}

const GITHUB_API = "https://api.github.com";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "GitCards-Pro",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchUser(username: string): Promise<GitHubUser> {
  return fetchJson<GitHubUser>(`${GITHUB_API}/users/${username}`);
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const repos = await fetchJson<GitHubRepo[]>(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`
  );
  return repos;
}

export async function fetchStats(username: string): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([
    fetchUser(username),
    fetchRepos(username),
  ]);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  const langMap = new Map<string, number>();
  repos.forEach((repo) => {
    if (repo.language) {
      langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1);
    }
  });

  const languages = Array.from(langMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return { user, repos, totalStars, totalForks, languages, topRepos };
}

export async function fetchRepo(
  username: string,
  repoName: string
): Promise<GitHubRepo> {
  return fetchJson<GitHubRepo>(`${GITHUB_API}/repos/${username}/${repoName}`);
}

export function estimateWeeklyActivity(repos: GitHubRepo[]): number[] {
  const now = Date.now();
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const activity = [0, 0, 0, 0, 0, 0, 0];

  repos.forEach((repo) => {
    const pushed = new Date(repo.pushed_at).getTime();
    const weeksAgo = Math.floor((now - pushed) / weekMs);
    if (weeksAgo < 7) {
      activity[6 - weeksAgo] += 1;
    }
  });

  return activity;
}

export function calculateStreak(repos: GitHubRepo[]): {
  current: number;
  longest: number;
  consistency: number;
} {
  const dates = repos
    .map((r) => new Date(r.pushed_at).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let current = 0;
  let longest = 0;
  let streak = 0;
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (dates[0] === today || dates[0] === yesterday) {
    current = 1;
    for (let i = 1; i < dates.length; i++) {
      const diff =
        (new Date(dates[i - 1]).getTime() - new Date(dates[i]).getTime()) /
        86400000;
      if (diff <= 1.5) {
        current++;
      } else {
        break;
      }
    }
  }

  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      streak = 1;
    } else {
      const diff =
        (new Date(dates[i - 1]).getTime() - new Date(dates[i]).getTime()) /
        86400000;
      if (diff <= 1.5) {
        streak++;
      } else {
        longest = Math.max(longest, streak);
        streak = 1;
      }
    }
  }
  longest = Math.max(longest, streak);

  const consistency = Math.min(100, Math.round((dates.length / 365) * 100));

  return { current, longest, consistency };
}

export function calculateGrowth(repos: GitHubRepo[]): {
  starsData: number[];
  reposData: number[];
  months: string[];
} {
  const now = new Date();
  const months: string[] = [];
  const starsData: number[] = [];
  const reposData: number[] = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(date.toLocaleString("default", { month: "short" }));

    const cutoff = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const reposBeforeCutoff = repos.filter(
      (r) => new Date(r.created_at || r.pushed_at) <= cutoff
    );
    starsData.push(
      reposBeforeCutoff.reduce((s, r) => s + r.stargazers_count, 0)
    );
    reposData.push(reposBeforeCutoff.length);
  }

  return { starsData, reposData, months };
}

export default function Home() {
  const endpoints = [
    { path: "/api/activity", desc: "Activity overview" },
    { path: "/api/streak", desc: "Contribution streak" },
    { path: "/api/growth", desc: "Growth analytics" },
    { path: "/api/tech", desc: "Tech stack" },
    { path: "/api/stats", desc: "GitHub stats" },
    { path: "/api/radar", desc: "Developer radar" },
    { path: "/api/heatmap", desc: "Activity heatmap" },
    { path: "/api/repo", desc: "Featured repo" },
    { path: "/api/all", desc: "All cards combined" },
  ];

  const themes = ["dark", "light", "neon", "glass", "neumorphic", "ocean", "sunset", "cyberpunk"];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d1117 0%, #161b22 100%)",
        color: "#e6edf3",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: "4rem 2rem",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #58a6ff 0%, #a371f7 50%, #f778ba 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            GitHub Cards
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#8b949e" }}>
            Premium SVG cards for your GitHub profile
          </p>
        </div>

        <div
          style={{
            background: "#161b22",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
            border: "1px solid #30363d",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", color: "#58a6ff" }}>
            Available Endpoints
          </h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {endpoints.map((e) => (
              <div
                key={e.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  background: "#21262d",
                  borderRadius: "8px",
                }}
              >
                <code style={{ color: "#a371f7", fontSize: "0.9rem" }}>
                  {e.path}?username=YOUR_USERNAME
                </code>
                <span style={{ color: "#8b949e", fontSize: "0.85rem" }}>{e.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#161b22",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
            border: "1px solid #30363d",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", color: "#58a6ff" }}>
            Themes
          </h2>
          <p style={{ color: "#8b949e", marginBottom: "1rem", fontSize: "0.9rem" }}>
            Add <code style={{ background: "#21262d", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>&theme=NAME</code> to any endpoint
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {themes.map((t) => (
              <span
                key={t}
                style={{
                  padding: "0.4rem 0.8rem",
                  background: "linear-gradient(135deg, #58a6ff20, #a371f720)",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  border: "1px solid #30363d",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", color: "#8b949e", fontSize: "0.85rem" }}>
          <p>Server-side rendered SVG cards with zero JavaScript</p>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0d1117",
        color: "#e6edf3",
        fontFamily: "system-ui, sans-serif",
        padding: "4rem 2rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #58a6ff, #a371f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}
        >
          GitCards Pro
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#8b949e", marginBottom: "3rem" }}>
          Beautiful SVG cards for your GitHub profile
        </p>

        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Available Cards</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <code style={{ background: "#161b22", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
              /api/activity?username=YOUR_USERNAME
            </code>
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <code style={{ background: "#161b22", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
              /api/streak?username=YOUR_USERNAME
            </code>
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <code style={{ background: "#161b22", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
              /api/growth?username=YOUR_USERNAME
            </code>
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <code style={{ background: "#161b22", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
              /api/tech?username=YOUR_USERNAME
            </code>
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <code style={{ background: "#161b22", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
              /api/repo?username=YOUR_USERNAME&repo=REPO_NAME
            </code>
          </li>
        </ul>

        <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>Themes</h2>
        <p style={{ color: "#8b949e" }}>
          Add <code style={{ background: "#161b22", padding: "0.125rem 0.25rem", borderRadius: "4px" }}>&theme=dark|light|neon|ocean|sunset</code> to any endpoint
        </p>
      </div>
    </main>
  );
}

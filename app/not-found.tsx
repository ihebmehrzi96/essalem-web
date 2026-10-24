import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "5rem", margin: 0, color: "#dfe4dd" }}>404</h1>
        <p style={{ fontSize: "1.2rem", margin: "0.5rem 0 2rem" }}>
          Page introuvable
        </p>
        <Link
          href="/fr"
          style={{
            background: "#11201a",
            color: "#fff",
            padding: "0.9rem 2rem",
            borderRadius: "999px",
            textDecoration: "none",
          }}
        >
          Retour à l&apos;accueil
        </Link>
      </body>
    </html>
  );
}
export const metadata = {
  title: "GitCards Pro",
  description: "Beautiful SVG cards for your GitHub profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

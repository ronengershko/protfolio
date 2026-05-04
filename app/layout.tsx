import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ronen Gershkovich | Software Engineer",
  description:
    "Personal portfolio for Ronen Gershkovich, a software engineer building AI-powered data pipelines, cloud infrastructure, and responsive products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

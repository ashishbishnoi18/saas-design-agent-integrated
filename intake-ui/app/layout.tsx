import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strategist Intake",
  description: "Intelligent intake conversation that drives the strategic-diagnosis pipeline",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

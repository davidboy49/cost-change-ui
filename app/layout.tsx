import "./globals.css";
import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Cost Change UI",
  description: "UI prototype converted from Excel mockup",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-neutral-50 text-neutral-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

import "@/styles/main.css";

import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import { OpenGraph } from "@/lib/og";

import clsx from "clsx";
import localFont from "next/font/local";

export const metadata: Metadata = {
  ...OpenGraph,
};

const zimula = localFont({
  src: "./fonts/zimula-inkspot/ZimulaTrial-TrialRegInkSpot.ttf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(zimula.className)} suppressHydrationWarning>
      <body>
        <Providers>
          <main className="px-4 py-4 ">
            <article className="article">{children}</article>
          </main>
        </Providers>
      </body>
    </html>
  );
}

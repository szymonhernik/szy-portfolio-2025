import "@/styles/main.css";

import type { Metadata } from "next";

import NavigationDesktop, { NavigationMobile } from "@/components/navigation";
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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(zimula.className)} suppressHydrationWarning>
      <body>
        <Providers>
          {modal}
          <div id="modal-root" />
          <main className="px-4 py-4 ">
            <NavigationMobile />
            <NavigationDesktop />
            <article className="article grid grid-cols-12 items-start">{children}</article>
          </main>
        </Providers>
      </body>
    </html>
  );
}

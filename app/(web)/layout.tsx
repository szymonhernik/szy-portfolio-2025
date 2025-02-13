import "@/styles/main.css";

import type { Metadata } from "next";

import NavigationDesktop, { NavigationMobile } from "@/components/navigation";
import { Providers } from "@/components/providers";
import { OpenGraph } from "@/lib/og";

import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import localFont from "next/font/local";

export const metadata: Metadata = {
  ...OpenGraph,
};

const zimula = localFont({
  src: ".././fonts/zimula-inkspot/ZimulaTrial-TrialRegInkSpot.ttf",
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
      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
      </head>
      <body className="">
        <Providers>
          {modal}
          <div id="modal-root" />
          <div id="full-screen-carousel-root" />

          <NavigationMobile />
          <NavigationDesktop />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

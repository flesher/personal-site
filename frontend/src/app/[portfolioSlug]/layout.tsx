import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "@/styles/globals.scss";

const robo = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matt Flesher",
  description: "Personal website of Matt Flesher",
  robots: "noindex",
};

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robo.className}>{children}</body>
      <GoogleAnalytics gaId="UA-42541202-1" />
    </html>
  );
}

export default Layout;
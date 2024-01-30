import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "@/styles/globals.scss";

const robo = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matt Flesher",
  description: "Personal website of Matt Flesher",
};

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robo.className}>{children}</body>
    </html>
  );
}

export default Layout;
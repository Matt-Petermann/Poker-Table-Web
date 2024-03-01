import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

interface RootProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poker Table Web"
};

export default function RootLayout({ children }: Readonly<RootProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

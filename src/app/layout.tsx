import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { DisplayIndicator } from "@/components/displayIndicator";

import "./globals.css";

interface RootProps {
    children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Poker Table Web"
};

export default ({ children }: Readonly<RootProps>) => (
    <html lang="en">
        <body className={`${inter.className} relative dark`}>
            <Providers>
                <span className="absolute top-2 left-2">
                    <DisplayIndicator />
                </span>                
                {children}
            </Providers>
        </body>
    </html>
);

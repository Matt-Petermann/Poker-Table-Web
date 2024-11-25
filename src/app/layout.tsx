"use client";

import { Inter } from "next/font/google";
import { DisplayIndicator } from "@/components/displayIndicator";

import "./globals.css";
import { TableContextProvider } from "@/contexts/tableContext";
import { NextUIProvider } from "@nextui-org/react";

interface RootProps {
    children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default ({ children }: Readonly<RootProps>) => (
    <html lang="en">
        <body className={`${inter.className} relative dark`}>
            <NextUIProvider>
                <TableContextProvider>
                    <span className="absolute top-2 left-2">
                        <DisplayIndicator />
                    </span>                
                    {children}
                </TableContextProvider>
            </NextUIProvider>
        </body>
    </html>
);

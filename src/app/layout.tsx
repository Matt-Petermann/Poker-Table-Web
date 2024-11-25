"use client";

import { Inter } from "next/font/google";
import { DisplayIndicator } from "@/components/displayIndicator";

import "./globals.css";
import { TableContextProvider } from "@/contexts/tableContext";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default ({ children }: Readonly<{ children: React.ReactNode }>) => (
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

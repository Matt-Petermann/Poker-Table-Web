"use client";

import { Inter } from "next/font/google";
import { TableContextProvider } from "@/contexts/tableContext";
import { NextUIProvider } from "@nextui-org/react";
import { DisplayIndicator } from "@/components/displayIndicator";
import { LoadingOverlay } from "@/components/loadingOverlay";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <html lang="en">
        <body className={`${inter.className} dark`}>
            <NextUIProvider>
                <TableContextProvider>
                    <LoadingOverlay />
                    <DisplayIndicator className="fixed top-2 left-2" />
                    {children}
                </TableContextProvider>
            </NextUIProvider>
        </body>
    </html>
);

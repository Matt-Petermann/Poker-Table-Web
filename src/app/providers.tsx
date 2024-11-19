"use client";

import { NextUIProvider } from "@nextui-org/react";
import { TableContextProvider } from "@/contexts/tableContext";

export const Providers = ({ children }: { children: React.ReactNode }) => (
    <NextUIProvider>
        <TableContextProvider>
            {children}
        </TableContextProvider>
    </NextUIProvider>
);

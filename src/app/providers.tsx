"use client";

import { NextUIProvider } from "@nextui-org/react";
import { TableContextProvider } from "../contexts/tableContext";

interface ProvidersProps {
    children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
    <NextUIProvider>
        <TableContextProvider value={children}>
            {children}
        </TableContextProvider>
    </NextUIProvider>
);

'use client'

import { NextUIProvider } from '@nextui-org/react';
import { TableContextProvider } from './contexts/tableContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({children}: ProvidersProps) {
  return (
    <NextUIProvider>
      <TableContextProvider value={children}>
        {children}
      </TableContextProvider>
    </NextUIProvider>
  )
}
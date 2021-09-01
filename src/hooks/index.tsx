import React, { ReactNode } from 'react';

import { ThemeProvider } from './theme';

interface IAppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

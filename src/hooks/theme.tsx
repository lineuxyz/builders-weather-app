import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { Appearance } from 'react-native';

import { light, dark } from '../styles/themes';

import AsyncStorage from '@react-native-community/async-storage';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';

interface IThemeContextData {
  toggleTheme(): void;
}

const ThemeContext = createContext<IThemeContextData>({} as IThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const deviceTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(deviceTheme === 'light' ? light : dark);

  useEffect(() => {
    async function getPersistedTheme(): Promise<void> {
      const persistedTheme = await AsyncStorage.getItem('theme');

      if (persistedTheme) {
        setTheme(persistedTheme === 'light' ? light : dark);
      }
    }

    getPersistedTheme();
  }, []);

  const persistTheme = useCallback(async themeToPersist => {
    setTheme(themeToPersist === 'light' ? light : dark);
    await AsyncStorage.setItem('theme', themeToPersist);
  }, []);

  useEffect(() => {
    persistTheme(deviceTheme);
  }, [deviceTheme, persistTheme]);

  const toggleTheme = useCallback(() => {
    persistTheme(theme.theme === 'light' ? 'dark' : 'light');
  }, [theme.theme, persistTheme]);

  return (
    <StyledComponentsProvider theme={theme}>
      <ThemeContext.Provider value={{ toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </StyledComponentsProvider>
  );
};

function useTheme(): IThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('An unexpected error has occurred');
  }

  return context;
}

export { ThemeProvider, useTheme };

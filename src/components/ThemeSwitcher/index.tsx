import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import Icon from '@expo/vector-icons/Feather';

import { useTheme } from '../../hooks/theme';

import { Container, Button } from './styles';

export function ThemeSwitcher() {
  const { theme, colors } = useContext(ThemeContext);
  const { toggleTheme } = useTheme();

  return (
    <Container>
      <Button onPress={toggleTheme}>
        {theme === 'light' ? (
          <Icon name="moon" size={22} color={colors.text} />
        ) : (
          <Icon name="sun" size={22} color={colors.text} />
        )}
      </Button>
    </Container>
  );
}

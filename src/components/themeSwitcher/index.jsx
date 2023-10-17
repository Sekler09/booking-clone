import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onThemeChange } from 'store/slices/themeSlice';

import { IconContainer, Moon, Sun } from './styled';

export default function ThemeSwitcher() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  const isDark = theme === 'dark';
  return (
    <IconContainer $isDark={isDark} onClick={() => dispatch(onThemeChange())}>
      <Moon $isDark={isDark} />
      <Sun $isDark={isDark} />
    </IconContainer>
  );
}

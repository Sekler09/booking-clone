import React from 'react';
import { useTranslation } from 'react-i18next';

import { IconContainer, Moon, Sun } from './styled';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const isDark = i18n.language === 'en';
  return (
    <IconContainer
      $isDark={isDark}
      onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')}
    >
      <Moon $isDark={isDark} />
      <Sun $isDark={isDark} />
    </IconContainer>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';

import { IconContainer, Rus, Usa } from './styled';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const isRu = i18n.language === 'ru';
  return (
    <IconContainer onClick={() => i18n.changeLanguage(isRu ? 'en' : 'ru')}>
      <Rus $isRu={isRu} />
      <Usa $isRu={isRu} />
    </IconContainer>
  );
}

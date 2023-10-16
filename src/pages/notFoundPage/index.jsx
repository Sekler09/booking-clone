import React from 'react';

import { ReactComponent as Four } from 'assets/four.svg';
import { ReactComponent as Ghost } from 'assets/ghost.svg';

import {
  IconsContainer,
  MainPageLink,
  NotFoundText,
  PageContainer,
} from './styled';

function NotFoundPage() {
  return (
    <PageContainer>
      <IconsContainer>
        <Four />
        <Ghost />
        <Four />
      </IconsContainer>
      <NotFoundText>
        Seems you have lost.&nbsp;
        <MainPageLink to="/">Go to the main page</MainPageLink>
      </NotFoundText>
    </PageContainer>
  );
}

export default NotFoundPage;

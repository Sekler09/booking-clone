import ManIcon from 'assets/man.png';
import React from 'react';

import { CountImg, CountInputWrapper, StyledCountInput } from './styled';

export default function CountInput() {
  return (
    <CountInputWrapper>
      <CountImg src={ManIcon} alt="Human Image" />
      <StyledCountInput type="text" readOnly value="text" />
    </CountInputWrapper>
  );
}

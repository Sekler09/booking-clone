import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 8px;
  max-width: 100%;
  background-color: ${({ theme }) => theme.mode.appBg};
  color: ${({ theme }) => theme.mode.textColor};
  box-shadow: 0 0 10px rgba(0 0 0 / 30%);
`;

const CloseButton = styled.button`
  position: absolute;
  top: -20px;
  right: -20px;
  cursor: pointer;

  &::after,
  &::before {
    position: absolute;
    border-radius: 2px;
    content: '';
    width: 20px;
    height: 4px;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::before {
    transform: rotate(-45deg);
  }

  &::after {
    transform: rotate(45deg);
  }
`;

export { ModalOverlay, ModalContainer, CloseButton };

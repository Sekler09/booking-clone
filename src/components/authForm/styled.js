import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  width: 400px;
  color: ${({ theme }) => theme.mode.textColor};

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    width: auto;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
`;

const SubmitButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.trueBlue};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.pantone};
  }
`;

const Label = styled.label`
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.trueBlue};

  &:hover {
    text-decoration: underline;
  }
`;

export {
  FormContainer,
  Form,
  Input,
  SubmitButton,
  Label,
  ErrorMessage,
  StyledLink,
  InputContainer,
  Title,
};

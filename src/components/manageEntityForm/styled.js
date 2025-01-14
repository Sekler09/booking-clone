import styled from 'styled-components';

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
`;

const Input = styled.input`
  padding: 8px 10px;
  border: 1px ${({ theme }) => theme.mode.elementsBorder} solid;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.mode.appBg};
  color: ${({ theme }) => theme.mode.textColor};
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RatingInput = styled(Input)`
  width: 50px;
  text-align: center;
  appearance: auto;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Select = styled.select`
  padding: 4px;
  border: 1px black solid;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  align-self: center;
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.trueBlue};
  font-size: medium;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export {
  ReviewForm,
  Input,
  Label,
  RatingInput,
  Select,
  SubmitButton,
  InputContainer,
  ErrorMessage,
};

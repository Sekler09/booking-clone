import { func } from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  FormContainer,
  Input,
  SubmitButton,
  Form,
  Label,
  ErrorMessage,
  StyledLink,
  InputContainer,
  Title,
} from './styled';

const EMAIL_REG_EX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function AuthForm({ onSubmit }) {
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    let isError = false;
    if (email.match(EMAIL_REG_EX)) {
      setEmailError(null);
    } else if (!email) {
      setEmailError('Email is required');
      isError = true;
    } else if (!email.match(EMAIL_REG_EX)) {
      setEmailError('Email format is incorrect');
      isError = true;
    }

    if (password) {
      setPasswordError(null);
    } else {
      setPasswordError('Password is required');
      isError = true;
    }

    if (!isError) onSubmit({ email, password }, setEmailError);
  }

  const isLogin = location.pathname.match('signin');

  return (
    <FormContainer>
      <Title>Sign in or create an account</Title>
      <Form onSubmit={e => onFormSubmit(e)}>
        <InputContainer>
          <Label>Email</Label>
          <Input
            type="text"
            onChange={e => onEmailChange(e)}
            value={email}
            placeholder="Enter your email"
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label>Password</Label>
          <Input
            type="password"
            onChange={e => onPasswordChange(e)}
            value={password}
            placeholder="Enter your password"
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </InputContainer>

        <SubmitButton type="submit">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </SubmitButton>
      </Form>
      {isLogin ? (
        <p>
          Do not have an account?{' '}
          <StyledLink to="/signup" state={{ prev: location.state?.prev }}>
            Sign Up
          </StyledLink>
        </p>
      ) : (
        <p>
          Have an account?{' '}
          <StyledLink to="/signin" state={{ prev: location.state?.prev }}>
            Sign in
          </StyledLink>
        </p>
      )}
    </FormContainer>
  );
}

AuthForm.propTypes = {
  onSubmit: func.isRequired,
};

export default AuthForm;

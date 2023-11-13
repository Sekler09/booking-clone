import { func } from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
      <Title>{t('authTitle')}</Title>
      <Form onSubmit={e => onFormSubmit(e)}>
        <InputContainer>
          <Label>{t('emailLabel')}</Label>
          <Input
            type="text"
            onChange={e => onEmailChange(e)}
            value={email}
            placeholder={t('emailPlaceholder')}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label>{t('passwordLabel')}</Label>
          <Input
            type="password"
            onChange={e => onPasswordChange(e)}
            value={password}
            placeholder={t('passwordPlaceholder')}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </InputContainer>

        <SubmitButton type="submit">
          {isLogin ? t('signin') : t('signup')}
        </SubmitButton>
      </Form>
      {isLogin ? (
        <p>
          {t('notHaveAnAccount')}{' '}
          <StyledLink to="/signup" state={{ prev: location.state?.prev }}>
            {t('signup')}
          </StyledLink>
        </p>
      ) : (
        <p>
          {t('haveAnAccount')}{' '}
          <StyledLink to="/signin" state={{ prev: location.state?.prev }}>
            {t('signin')}
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

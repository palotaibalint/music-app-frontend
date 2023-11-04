import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import LoadingScreen from '../utils/LoadingPage';
import OktaSignInWidget from './OktaSignInWidget';

const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log('Sign in error: ', err);
  };

  if (!authState) {
    return <LoadingScreen />;
  }

  if (authState.isAuthenticated) {
    navigate('/');
    return null;
  }

  return <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />;
};

export default LoginWidget;

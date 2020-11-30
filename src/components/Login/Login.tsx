import React from 'react';
import './Login.scss';
import LoginButton from './LoginButton/LoginButton';

const Login: React.FC = () => {
  return (
    <>
      <div className="container-full">
        <LoginButton />
      </div>
    </>
  );
};

export default Login;

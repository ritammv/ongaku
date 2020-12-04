import React from 'react';
import './LoginButton.scss';

interface Props {
  text: string;
  width: string;
  fontSize: string;
  styles: boolean;
}

const LoginButton: React.FC<Props> = ({ text, width, fontSize, styles }) => {
  return (
    <>
      <a href="http://localhost:3001/auth/provider" style={{ width }}>
        <button type="button" className={styles ? 'loginbutton' : ''} style={{ fontSize }}>
          {text}
        </button>
      </a>
    </>
  );
};

export default LoginButton;

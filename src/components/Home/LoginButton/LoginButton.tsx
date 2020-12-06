import React from 'react';
import './LoginButton.scss';
import discogs from '../../../assets/discogs-logo.svg';
import discogs2 from '../../../assets/discogs-2.svg';

interface Props {
  text: string;
  width: string;
  fontSize: string;
  styles: boolean;
  discogsLogo: number;
}

const LoginButton: React.FC<Props> = ({
  text,
  width,
  fontSize,
  styles,
  discogsLogo,
}) => {
  return (
    <>
      <a href="http://localhost:3001/auth/provider" style={{ width }}>
        <button
          type="button"
          className={styles ? 'loginbutton' : ''}
          style={{ fontSize }}
        >
          {text}
          {discogsLogo === 1 && (
            <img className="discogs-logo" src={discogs} alt="login_img" />
          )}
          {discogsLogo === 2 && (
            <img className="discogs-logo2" src={discogs2} alt="login_img" />
          )}
        </button>
      </a>
    </>
  );
};

export default LoginButton;

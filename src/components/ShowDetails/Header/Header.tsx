import React, { useRef, useState } from 'react';
import './Header.scss';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IconButton } from '@chakra-ui/react';
import SideBar from '../../Dashboard/SideBar/SideBar';
import headerImg from '../../../assets/vinyl.jpg';
import { Details } from '../getDetails';

interface Props {
  data: Details
}

const Header: React.FC<Props> = ({ data }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <div className="detail_header">
        <div className="header_inner">
          <div className="inner_left_container">
            <img src={headerImg} alt="thumbail" />
          </div>
          <div className="inner_center_container">
            <div className="center_type">
              Type: {data.type}
            </div>
            <div className="center_title">
              {data.title ? data.title : data.name}
            </div>
          </div>
          <div className="inner_right_container">
            <IconButton
              className="button_emoji"
              aria-label="burger-icon"
              backgroundColor="inherit"
              size="lg"
              icon={<GiHamburgerMenu />}
              type="button"
              ref={btnRef}
              onClick={() => {
                setShowSideBar((state) => !state);
              }}
            />
            <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
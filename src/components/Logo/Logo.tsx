import React from 'react';
import './Logo.scss';

interface Props {
  widthPx: number,
  outerColor: string,
  innerColor: string,
  textColor: string, 
}

const Logo: React.FC<Props>
  = ({ widthPx, outerColor, innerColor, textColor }) => {
    return (
      <>
        <div 
          className="logo_outer_circle" 
          style={{ width: `${widthPx}px`, height: `${widthPx}px`, background: outerColor }}
        >
          <div className="logo_inner_circle" style={{ background: innerColor }}>
            <div className="logo_text_container">
              <div 
                className="logo_text_large" 
                style={{ color: textColor, fontSize: `${widthPx/2.5}px` }}
              >
                音
              </div>
              <div 
                className="logo_text_small" 
                style={{ color: textColor, fontSize: `${widthPx/5}px` }}
              >
                楽
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

export default Logo;

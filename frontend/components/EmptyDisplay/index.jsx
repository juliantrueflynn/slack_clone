import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

const EmptyDisplay = ({
  topIcon,
  topIconHexColor,
  children,
  loadingIcon,
  ...props
}) => {
  const color = topIconHexColor || '#00CEC9';
  const iconStyle = { color };

  return (
    <div className="EmptyDisplay">
      {topIcon && (
        <div className="EmptyDisplay__top-icon">
          <FontAwesomeIcon icon={topIcon} fixedWidth style={iconStyle} />
        </div>
      )}
      {!!children && (
        <div className="EmptyDisplay__txt">
          {children}
        </div>
      )}
      {loadingIcon && (
        <FontAwesomeIcon
          className="EmptyDisplay__loading-icon"
          icon={loadingIcon}
          spin
          size="3x"
          {...props}
        />
      )}
    </div>
  );
};

export default EmptyDisplay;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './EmptyDisplay.css';

const EmptyDisplay = ({
  topIcon,
  topIconHexColor,
  children,
  hasLoadingIcon,
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
      {hasLoadingIcon && (
        <FontAwesomeIcon className="EmptyDisplay__loading-icon" icon="spinner" spin pulse size="3x" />
      )}
    </div>
  );
};

export default EmptyDisplay;

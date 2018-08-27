import React from 'react';
import './Button.css';

const Button = ({ buttonFor, fullWidth, ...props }) => {
  let classNames = 'Btn';
  if (buttonFor) classNames += ` Btn__${buttonFor}`;
  if (fullWidth) classNames += ' Btn__w100';

  return (
    <button type="button" className={classNames} {...props} />
  );
};

export default Button;

import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({
  unStyled,
  buttonFor,
  modifier,
  size,
  color,
  linkTo,
  fullWidth,
  borderThick,
  borderLess,
  ...props
}) => {
  let classNames = 'Btn';
  if (unStyled) {
    classNames += ' Btn__unstyled';
  } else {
    classNames += ' Btn__styled';
    if (size) classNames += ` Btn__${size}`;
  }
  if (buttonFor && modifier) classNames += ` Btn__${buttonFor}--${modifier}`;
  if (buttonFor) classNames += ` Btn__${buttonFor}`;
  if (color) classNames += ` Btn__${color}`;
  if (fullWidth) classNames += ' Btn__w100';

  if (linkTo) return <Link role="button" className={classNames} to={linkTo} {...props} />;

  return <button type="button" className={classNames} {...props} />;
};

export default Button;

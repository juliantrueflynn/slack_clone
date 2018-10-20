import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Button.css';

const Button = ({
  unStyled,
  buttonFor,
  modifier,
  size,
  color,
  linkTo,
  fullWidth,
  ...props
}) => {
  const btnClassNames = classNames('Btn', {
    Btn__unstyled: unStyled,
    Btn__styled: !unStyled,
    Btn__w100: fullWidth,
    [`Btn__${size}`]: size,
    [`Btn__${buttonFor}`]: buttonFor,
    [`Btn__${buttonFor}--${modifier}`]: buttonFor && modifier,
    [`Btn__${color}`]: color,
  });

  if (linkTo) return <Link role="button" className={btnClassNames} to={linkTo} {...props} />;

  return <button type="button" className={btnClassNames} {...props} />;
};

export default Button;

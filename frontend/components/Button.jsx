import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Button.css';

const Button = React.forwardRef(({
  unStyled,
  buttonFor,
  modifier,
  size,
  color,
  linkTo,
  isActive,
  ...props
}, ref) => {
  const { type } = props;
  const btnClassNames = classNames('Btn', {
    Btn__unstyled: unStyled,
    Btn__styled: !unStyled,
    [`Btn__${type}`]: !buttonFor && type,
    [`Btn__${size}`]: size,
    [`Btn__${buttonFor}`]: buttonFor,
    [`Btn__${buttonFor}--${modifier}`]: buttonFor && modifier,
    'Btn--active': !buttonFor && isActive,
    [`Btn__${buttonFor}--active`]: buttonFor && isActive,
    [`Btn__${color}`]: color,
  });

  if (linkTo) {
    return <Link role="button" ref={ref} className={btnClassNames} to={linkTo} {...props} />;
  }

  return <button type="button" ref={ref} className={btnClassNames} {...props} />;
});

export default Button;

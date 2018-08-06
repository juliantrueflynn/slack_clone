import React from 'react';
import './Button.css';

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button ref={ref} type="button" className={`Btn ${className}`} {...props} />
));

export default Button;

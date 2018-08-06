import React from 'react';
import FormErrors from './Layout/FormErrors';

const Form = ({
  children,
  className,
  formFor,
  ...props
}) => {
  let classNames = 'Form';
  if (formFor) classNames += ` ${formFor}`;
  if (className) classNames += ` ${className}`;

  return (
    <form className={classNames} {...props}>
      {formFor && (<FormErrors entity={formFor} />)}
      {children}
    </form>
  );
};

export default Form;

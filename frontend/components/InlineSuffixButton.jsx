import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';

const InlineSuffixButton = ({
  children,
  icon,
  onClick,
  ...btnProps
}) => (
  <Fragment>
    {children}
    <Button buttonFor="suffix" unStyled onClick={onClick} {...btnProps}>
      <FontAwesomeIcon icon={icon} />
    </Button>
  </Fragment>
);

export default InlineSuffixButton;

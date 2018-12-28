import React from 'react';
import Button from './Button';
import './ModalHeader.css';

const ModalHeader = ({ modalTitle, close }) => {
  if (!modalTitle) {
    return null;
  }

  return (
    <header className="ModalHeader">
      <div className="ModalHeader__content">
        <h2 className="ModalHeader__title">{modalTitle}</h2>
        <Button buttonFor="close" modifier="header" unStyled onClick={close}>
          <span role="img" aria-label="Close modal">&times;</span>
        </Button>
      </div>
    </header>
  );
};

export default ModalHeader;

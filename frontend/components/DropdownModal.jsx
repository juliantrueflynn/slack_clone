import React from 'react';
import Modal from './Modal';
import Menu from './Menu';
import './DropdownModal.css';

const DropdownModal = ({ items, modalProps, close }) => {
  const { clickPosY, clickPosX } = modalProps;

  const style = {
    content: {
      top: `${clickPosY}px`,
      left: `${clickPosX - 280}px`,
      position: 'absolute',
    }
  };

  return (
    <Modal isOpen close={close} modalFor="dropdown" style={style} unStyled hasNoWrappers>
      <Menu menuFor="dropdown" items={items} />
    </Modal>
  );
};

export default DropdownModal;

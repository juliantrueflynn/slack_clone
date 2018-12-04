import React from 'react';
import Modal from './Modal';
import Menu from './Menu';
import './DropdownModal.css';

const DropdownModal = ({
  items,
  dropdownProps,
  menuProps,
  ...modalProps
}) => {
  const { clickPosY, clickPosX } = dropdownProps;

  const style = {
    content: {
      top: `${clickPosY}px`,
      left: `${clickPosX - 280}px`,
      position: 'absolute',
    }
  };

  return (
    <Modal isOpen modalFor="dropdown" style={style} unStyled hasNoWrappers {...modalProps}>
      <Menu menuFor="dropdown" items={items} {...menuProps} />
    </Modal>
  );
};

export default DropdownModal;

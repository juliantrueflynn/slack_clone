import React from 'react';
import Modal from './Modal';
import Menu from './Menu';
import './RightSidebarModal.css';

const RightSidebarModal = ({ modalClose, menuItems }) => {
  const items = menuItems.map(item => ({
    label: <span className="RightSidebarModal__item-label">{item.title}</span>,
    ...item
  }));

  return (
    <Modal
      isOpen
      modalFor="right-sidebar"
      modalPos="right"
      close={modalClose}
      hasDarkOverlay
      unStyled
    >
      <Menu items={items} menuFor="right-sidebar" unStyled />
    </Modal>
  );
};

export default RightSidebarModal;

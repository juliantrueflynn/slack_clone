import React from 'react';
import Modal from './Modal';

const RightSidebarModal = ({ modalClose }) => (
  <Modal
    isOpen
    modalFor="right-sidebar"
    modalPos="right"
    close={modalClose}
    unStyled
  >
    Right Sidebar
  </Modal>
);

export default RightSidebarModal;

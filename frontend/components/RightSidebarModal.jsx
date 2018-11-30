import React from 'react';
import Modal from './Modal';

const RightSidebarModal = ({ modalClose }) => (
  <Modal
    isOpen
    modalFor="right-sidebar"
    close={modalClose}
  >
    Right Sidebar
  </Modal>
);

export default RightSidebarModal;

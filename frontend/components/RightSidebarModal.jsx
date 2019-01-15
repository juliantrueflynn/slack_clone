import React from 'react';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import Menu from './Menu';
import './RightSidebarModal.css';

const RightSidebarModal = ({
  isOpen,
  closeModal,
  openProfileModal,
  drawerType,
  chatroom,
  toggleLink,
}) => {
  if (!isOpen) {
    return null;
  }

  const mobileMenuItems = [
    {
      key: 'details',
      label: 'Channel Details',
      icon: <FontAwesomeIcon icon="info-circle" fixedWidth />,
      onClick: () => toggleLink('details'),
      isOpen: chatroom && drawerType === 'details',
    },
    {
      key: 'favorites',
      label: 'Starred Items',
      icon: <FontAwesomeIcon icon="star" />,
      onClick: () => toggleLink('favorites'),
      isOpen: drawerType === 'favorites',
    },
    {
      key: 'profile',
      label: 'Edit Profile',
      icon: <FontAwesomeIcon icon={faUserCog} />,
      onClick: openProfileModal,
    }
  ];

  return (
    <Modal
      isOpen
      modalFor="right-sidebar"
      modalPos="right"
      close={closeModal}
      unStyled
    >
      <Menu items={mobileMenuItems} menuFor="right-sidebar" unStyled />
    </Modal>
  );
};

export default RightSidebarModal;

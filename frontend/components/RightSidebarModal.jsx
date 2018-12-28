import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import Menu from './Menu';
import './RightSidebarModal.css';

const RightSidebarModal = ({
  closeModal,
  openModalProfile,
  drawerType,
  channel,
  toggleLink,
}) => {
  const mobileMenuItems = [
    {
      key: 'details',
      label: 'Channel Details',
      icon: <FontAwesomeIcon icon="info-circle" fixedWidth />,
      onClick: () => toggleLink('details'),
      isItemActive: channel && drawerType === 'details',
    },
    {
      key: 'favorites',
      label: 'Starred Items',
      icon: <FontAwesomeIcon icon="star" />,
      onClick: () => toggleLink('favorites'),
      isItemActive: drawerType === 'favorites',
    },
    {
      key: 'profile',
      label: 'Edit Profile',
      icon: <FontAwesomeIcon icon="user-cog" />,
      onClick: openModalProfile,
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

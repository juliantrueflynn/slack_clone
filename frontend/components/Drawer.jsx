import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollBar from './ScrollBar';
import Button from './Button';
import Modal from './Modal';
import './Drawer.css';

const Drawer = ({
  isLoading,
  drawerType,
  closeDrawer,
  drawerTitle,
  messages,
  isModalOpen,
  children,
}) => {
  const isConvo = drawerType === 'convo';
  const drawerClassNames = `Drawer Drawer__${drawerType}`;

  if (isModalOpen) {
    return (
      <Modal
        isOpen
        modalFor="drawer"
        modalTitle={drawerTitle}
        close={closeDrawer}
      >
        <div className={drawerClassNames}>{children({ messages })}</div>
      </Modal>
    );
  }

  return (
    <div className={drawerClassNames}>
      <header className="Drawer__header">
        <h3 className="Drawer__header-title">{drawerTitle}</h3>
        <Button unStyled buttonFor="close" onClick={closeDrawer}>
          <FontAwesomeIcon icon="times" />
        </Button>
      </header>
      <div className="Drawer__container">
        <div className="Drawer__body">
          {isConvo && !isLoading && <Fragment>{children({ messages })}</Fragment>}
          {isConvo || <ScrollBar>{children({ messages })}</ScrollBar>}
        </div>
      </div>
    </div>
  );
};

export default Drawer;

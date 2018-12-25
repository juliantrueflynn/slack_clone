import React from 'react';
import Modal from './Modal';
import withWindowResize from './withWindowResize';
import './DropdownModal.css';

class DropdownModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: 0, top: 0 };
    this.handleAfterModalOpen = this.handleAfterModalOpen.bind(this);
  }

  handleAfterModalOpen() {
    const {
      windowWidth,
      windowHeight,
      coordinates: { posX, posY }
    } = this.props;
    const { clientWidth, clientHeight } = this.contentRef;

    const left = windowWidth - posX + clientWidth;
    let top = windowHeight - posY;

    if ((posY + clientHeight) > (windowHeight - 10)) {
      top = clientHeight + 20;
    }

    this.setState({ left, top });
  }

  render() {
    const {
      isDdOpen,
      coordinates,
      fixedLeftPos,
      windowWidth,
      windowHeight,
      children,
      ...modalProps
    } = this.props;
    const { top, left } = this.state;

    if (!isDdOpen) {
      return null;
    }

    const style = {
      content: {
        top: `${windowHeight - top}px`,
        left: fixedLeftPos || `${windowWidth - left}px`,
        position: 'absolute',
      }
    };

    return (
      <Modal
        isOpen={isDdOpen}
        modalFor="dropdown"
        style={style}
        unStyled
        hasNoWrappers
        shouldReturnFocusAfterClose={false}
        contentRef={(node) => { this.contentRef = node; }}
        onAfterOpen={this.handleAfterModalOpen}
        {...modalProps}
      >
        {children}
      </Modal>
    );
  }
}

export default withWindowResize(DropdownModal);

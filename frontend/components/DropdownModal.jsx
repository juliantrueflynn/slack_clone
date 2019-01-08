import React from 'react';
import Modal from './Modal';
import withWindowResize from './withWindowResize';
import ScrollBar from './ScrollBar';
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
      coords: { posX, posY }
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
      coords,
      windowWidth,
      windowHeight,
      children,
      bemModifier,
      contentStyle,
      ...modalProps
    } = this.props;
    const { top, left } = this.state;

    const style = {
      content: {
        position: 'absolute',
        top: `${windowHeight - top}px`,
        left: `${windowWidth - left}px`,
        ...contentStyle,
      }
    };

    return (
      <Modal
        isOpen
        modalFor="dropdown"
        style={style}
        unStyled
        contentRef={(node) => { this.contentRef = node; }}
        onAfterOpen={this.handleAfterModalOpen}
        bemModifier={bemModifier}
        {...modalProps}
      >
        <ScrollBar>{children}</ScrollBar>
      </Modal>
    );
  }
}

export default withWindowResize(DropdownModal);

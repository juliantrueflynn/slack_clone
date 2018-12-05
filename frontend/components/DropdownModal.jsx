import React from 'react';
import Modal from './Modal';
import Menu from './Menu';
import withWindowResize from './withWindowResize';
import './DropdownModal.css';

class DropdownModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { initRightPos: 0, initTopPos: 0 };
    this.handleAfterModalOpen = this.handleAfterModalOpen.bind(this);
  }

  handleAfterModalOpen() {
    const { dropdownProps: { right, bottom } } = this.props;
    const { innerWidth, innerHeight } = window;
    const { clientWidth } = this.contentRef;

    const initRightPos = innerWidth - right + clientWidth;
    const initTopPos = innerHeight - bottom;

    this.setState({ initRightPos, initTopPos });
  }

  render() {
    const {
      items,
      dropdownProps,
      menuProps,
      windowWidth,
      windowHeight,
      ...modalProps
    } = this.props;
    const { initRightPos, initTopPos } = this.state;

    const leftPos = windowWidth - initRightPos;
    const topPos = windowHeight - initTopPos;

    const style = {
      content: {
        top: `${topPos}px`,
        left: `${leftPos}px`,
        position: 'absolute',
      }
    };

    return (
      <Modal
        isOpen
        modalFor="dropdown"
        style={style}
        unStyled
        hasNoWrappers
        contentRef={(node) => { this.contentRef = node; }}
        onAfterOpen={this.handleAfterModalOpen}
        {...modalProps}
      >
        <Menu menuFor="dropdown" items={items} {...menuProps} />
      </Modal>
    );
  }
}

export default withWindowResize(DropdownModal);

import React from 'react';
import Modal from './Modal';
import Menu from './Menu';
import withWindowResize from './withWindowResize';
import './DropdownModal.css';

class DropdownModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: 0, top: 0 };
    this.handleAfterModalOpen = this.handleAfterModalOpen.bind(this);
  }

  isHeightFixed() {
    const { windowHeight, dropdownProps: { bottom } } = this.props;
    const { clientHeight } = this.contentRef;

    return (bottom + clientHeight) > (windowHeight - 10);
  }

  handleAfterModalOpen() {
    const {
      windowWidth,
      windowHeight,
      dropdownProps: { right, bottom },
    } = this.props;
    const { clientWidth, clientHeight } = this.contentRef;

    const left = windowWidth - right + clientWidth;
    let top = windowHeight - bottom;

    if ((bottom + clientHeight) > (windowHeight - 10)) {
      top = clientHeight + 20;
    }

    this.setState({ left, top });
  }

  render() {
    const {
      items,
      dropdownProps,
      fixedLeftPos,
      menuProps,
      windowWidth,
      windowHeight,
      ...modalProps
    } = this.props;
    const { top, left } = this.state;

    const style = {
      content: {
        top: `${windowHeight - top}px`,
        left: fixedLeftPos || `${windowWidth - left}px`,
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

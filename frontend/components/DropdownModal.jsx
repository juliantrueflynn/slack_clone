import React from 'react';
import Modal from './Modal';
import withWindowResize from './withWindowResize';
import ScrollBar from './ScrollBar';
import './DropdownModal.css';

class DropdownModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleAfterModalOpen = this.handleAfterModalOpen.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { windowWidth, windowHeight } = this.props;

    if (windowWidth !== prevProps.windowWidth || windowHeight !== prevProps.windowHeight) {
      this.handleModalCoordinates();
    }
  }

  handleAfterModalOpen() {
    this.handleModalCoordinates();
  }

  handleModalCoordinates() {
    const { updateModalStyles } = this.props;
    const { width, height } = this.contentRef.getBoundingClientRect();
    updateModalStyles({ width, height });
  }

  render() {
    const {
      windowWidth,
      windowHeight,
      children,
      bemModifier,
      contentStyle,
      ...modalProps
    } = this.props;

    const style = {
      content: { position: 'absolute', ...contentStyle }
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

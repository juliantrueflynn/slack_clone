import React, { Fragment } from 'react';
import Button from './Button';
import DropdownModal from './DropdownModal';

class DropdownModalTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: null, top: null };
    this.triggerRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateModalStyles = this.updateModalStyles.bind(this);
  }

  handleClick(e) {
    const { openDropdown, onClick } = this.props;

    openDropdown();

    if (onClick) {
      onClick(e);
    }
  }

  handleClose(e) {
    const { onClose, closeDropdown } = this.props;

    if (onClose) {
      onClose(e);
    }

    closeDropdown();
  }

  updateModalStyles({ width, height }) {
    if (!this.triggerRef && !this.triggerRef.current) {
      return;
    }

    const { right, bottom } = this.triggerRef.current.getBoundingClientRect();
    let topPos = bottom;

    if (height + bottom > window.innerHeight) {
      topPos = window.innerHeight - height - 20;
    }

    this.setState({
      left: `${right - width}px`,
      top: `${topPos}px`,
    });
  }

  render() {
    const {
      children,
      className,
      isDdOpen,
      bemModifier,
      contentStyle,
      dropdownChild,
    } = this.props;
    const { left, top } = this.state;

    const style = { left, top, ...contentStyle };

    return (
      <Fragment>
        <Button
          ref={this.triggerRef}
          onClick={this.handleClick}
          className={className}
          isActive={isDdOpen}
          unStyled
        >
          {children}
        </Button>
        {isDdOpen && (
          <DropdownModal
            bemModifier={bemModifier}
            contentStyle={style}
            close={this.handleClose}
            updateModalStyles={this.updateModalStyles}
          >
            {dropdownChild}
          </DropdownModal>
        )}
      </Fragment>
    );
  }
}

export default DropdownModalTrigger;

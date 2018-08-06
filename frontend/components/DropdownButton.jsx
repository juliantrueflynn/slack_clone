import React from 'react';
import Button from './Button';

class DropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTogglerClick = this.handleTogglerClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      this.handleTogglerClick();
    }

    if (e.key === 'ArrowDown') {
      this.handleTogglerClick();
    }
  }

  handleTogglerClick() {
    const { togglerClick } = this.props;
    togglerClick();
  }

  handleFocus() {
    const { isOpen } = this.props;
    if (isOpen) this.handleTogglerClick();
  }

  render() {
    const { isOpen, togglerText } = this.props;

    return (
      <Button
        id="ddToggler"
        className="Btn__dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="ddMenu"
        onKeyDown={this.handleKeyDown}
        onClick={this.handleTogglerClick}
        onFocus={this.handleFocus}
      >
        {togglerText}
      </Button>
    );
  }
}

export default DropdownButton;

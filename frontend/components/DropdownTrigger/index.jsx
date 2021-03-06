import React, { Fragment } from 'react';
import Button from '../Button';
import Dropdown from '../Dropdown';

class DropdownModalTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: null, top: null };
    this.triggerRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.updateModalStyles = this.updateModalStyles.bind(this);
  }

  getBemModifier() {
    const { dropdownType, bemModifier } = this.props;

    return bemModifier || dropdownType.slice(9).replace(/_/g, '-').toLowerCase();
  }

  handleClick(e) {
    const { openDropdown, onClick } = this.props;

    openDropdown();

    if (onClick) {
      onClick(e);
    }
  }

  updateModalStyles({ width, height }) {
    if (!this.triggerRef && !this.triggerRef.current) {
      return;
    }

    const { right, bottom } = this.triggerRef.current.getBoundingClientRect();
    let topPos = bottom;
    let leftPos = right - width;

    if (height + bottom > window.innerHeight) {
      topPos = window.innerHeight - height - 20;
    }

    if (right - width < 10) {
      leftPos = 10;
    }

    this.setState({
      left: `${leftPos}px`,
      top: `${topPos}px`,
    });
  }

  render() {
    const {
      children,
      isDdOpen,
      contentStyle,
      closeDropdown,
      dropdownChild,
    } = this.props;
    const { left, top } = this.state;

    const style = { left, top, ...contentStyle };

    return (
      <Fragment>
        <Button
          ref={this.triggerRef}
          onClick={this.handleClick}
          buttonFor="dropdown"
          modifier={this.getBemModifier()}
          isActive={isDdOpen}
          unStyled
        >
          {children}
        </Button>
        {isDdOpen && (
          <Dropdown
            bemModifier={this.getBemModifier()}
            contentStyle={style}
            close={closeDropdown}
            updateModalStyles={this.updateModalStyles}
          >
            {dropdownChild}
          </Dropdown>
        )}
      </Fragment>
    );
  }
}

export default DropdownModalTrigger;

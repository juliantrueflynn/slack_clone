import React, { Fragment } from 'react';
import Button from './Button';
import DropdownModal from './DropdownModal';

class DropdownModalTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.handleDdToggleClick = this.handleDdToggleClick.bind(this);
  }

  handleDdToggleClick(e) {
    const { openDropdown } = this.props;
    const { bottom: posY, right: posX } = e.currentTarget.getBoundingClientRect();

    openDropdown({ posY, posX });
  }

  render() {
    const {
      children,
      className,
      closeDropdown,
      dropdownProps,
      isDdOpen,
      bemModifier,
      contentStyle,
      dropdownChild,
    } = this.props;

    return (
      <Fragment>
        <Button
          onClick={this.handleDdToggleClick}
          className={className}
          isActive={isDdOpen}
          unStyled
        >
          {children}
        </Button>
        {isDdOpen && (
          <DropdownModal
            coords={dropdownProps}
            close={closeDropdown}
            bemModifier={bemModifier}
            contentStyle={contentStyle}
          >
            {dropdownChild}
          </DropdownModal>
        )}
      </Fragment>
    );
  }
}

export default DropdownModalTrigger;

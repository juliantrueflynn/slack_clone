import React from 'react';
import classNames from 'classnames';
import Menu from './Menu';
import Button from './Button';
import PopoverOverlayHandler from './PopoverOverlayHandler';
import './Dropdown.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      clickPosY: -1,
      menuStyle: {},
    };

    this.handleTogglerClick = this.handleTogglerClick.bind(this);
    this.handleStyleFromHeight = this.handleStyleFromHeight.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  handleTogglerClick(e) {
    const { ddToggle, shouldPos } = this.props;
    const { isOpen } = this.state;

    const nextState = { isOpen: !isOpen };

    if (ddToggle) {
      ddToggle(null, !isOpen);
    }

    if (shouldPos && e) {
      const { y } = e.target.getBoundingClientRect();
      nextState.clickPosY = y;
    }

    this.setState(nextState);
  }

  handleOverlayClick(e) {
    const { ddToggle, onOverlayClick } = this.props;
    const { isOpen } = this.state;

    if (isOpen) {
      this.setState({ isOpen: false });

      if (onOverlayClick) {
        onOverlayClick(e);
      } else if (ddToggle) {
        ddToggle(null, false);
      }
    }
  }

  handleStyleFromHeight(height) {
    const { clickPosY } = this.state;

    let menuStyle = {};
    if ((clickPosY + height + 90) > window.innerHeight) {
      menuStyle = { top: `-${height}px` };
    }

    this.setState({ menuStyle });
  }

  render() {
    const {
      menuFor,
      menuPos,
      togglerText,
      children,
      modifier,
      ddToggle,
      onOverlayClick,
      ...menuProps
    } = this.props;
    const { isOpen, menuStyle } = this.state;

    const ddClassNames = classNames('Dropdown', {
      [`Dropdown--${menuPos}`]: menuPos,
      'Dropdown--left': !menuPos,
      [`Dropdown__${menuFor}`]: menuFor,
      [`Dropdown__${menuFor}--${modifier}`]: menuFor && modifier,
      'Dropdown--opened': isOpen,
      'Dropdown--closed': !isOpen,
    });

    return (
      <div className={ddClassNames}>
        <Button
          buttonFor="dropdown"
          onClick={this.handleTogglerClick}
          unStyled
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {togglerText || children}
        </Button>
        {isOpen && (
          <PopoverOverlayHandler onOverlayClick={this.handleOverlayClick}>
            <Menu
              menuFor="dropdown"
              style={menuStyle}
              handleStyleFromHeight={this.handleStyleFromHeight}
              toggleMenu={this.handleTogglerClick}
              {...menuProps}
            />
          </PopoverOverlayHandler>
        )}
      </div>
    );
  }
}

export default Dropdown;

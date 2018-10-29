import React from 'react';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import Menu from './Menu';
import Button from './Button';
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
  }

  componentDidUpdate(prevProps) {
    const { isOpen, shouldPos } = this.props;

    if (shouldPos) {
      if (!prevProps.isOpen && isOpen) {
        Dropdown.setBodyClassList('add');
      }

      if (prevProps.isOpen && !isOpen) {
        Dropdown.setBodyClassList('remove');
      }
    }
  }

  static setBodyClassList(addOrRemove) {
    const bodyEl = document.querySelector('body');
    bodyEl.classList[addOrRemove]('popover-open');
  }

  handleClickOutside() {
    const { ddToggle } = this.props;
    const { isOpen } = this.state;

    if (isOpen) {
      this.setState({ isOpen: false });

      if (ddToggle) {
        ddToggle(!isOpen);
      }
    }
  }

  handleTogglerClick(e) {
    const { ddToggle, shouldPos } = this.props;
    const { isOpen } = this.state;

    const nextState = { isOpen: !isOpen };

    if (ddToggle) {
      ddToggle(!isOpen);
    }

    if (shouldPos && e) {
      const { y } = e.target.getBoundingClientRect();
      nextState.clickPosY = y;
    }

    this.setState(nextState);
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
    const { isOpen, menuStyle } = this.state;
    const {
      menuFor,
      menuPos,
      items,
      togglerText,
      children,
      modifier,
      shouldPos,
      style,
      unStyled,
    } = this.props;

    const ddClassNames = classNames('Dropdown', {
      [`Dropdown--${menuPos}`]: menuPos,
      'Dropdown--left': !menuPos,
      [`Dropdown__${menuFor}`]: menuFor,
      [`Dropdown__${menuFor}--modifier`]: menuFor && modifier,
      'Dropdown--show': isOpen,
      'Dropdown--hide': !isOpen,
    });

    return (
      <div className={ddClassNames}>
        <Button buttonFor="dropdown" onClick={this.handleTogglerClick} style={style} unStyled={unStyled}>
          {togglerText || children}
        </Button>
        <Menu
          menuFor="dropdown"
          items={items}
          style={menuStyle}
          isDdOpen={isOpen}
          shouldPos={shouldPos}
          handleStyleFromHeight={this.handleStyleFromHeight}
          toggleMenu={this.handleTogglerClick}
        />
      </div>
    );
  }
}

export default onClickOutside(Dropdown);

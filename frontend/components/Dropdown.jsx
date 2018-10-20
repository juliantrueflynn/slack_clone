import React from 'react';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import Menu from './Menu';
import Button from './Button';
import './Dropdown.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleTogglerClick = this.handleTogglerClick.bind(this);
  }

  handleClickOutside() {
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({ isOpen: false });
    }
  }

  handleTogglerClick() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const {
      menuFor,
      menuPos,
      items,
      togglerText,
      children,
      modifier,
      style,
      unStyled,
    } = this.props;

    if (!items) {
      return null;
    }

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
        <Menu menuFor="dropdown" toggleMenu={this.handleTogglerClick} items={items} />
      </div>
    );
  }
}

export default onClickOutside(Dropdown);

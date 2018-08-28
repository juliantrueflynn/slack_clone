import React from 'react';
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
    if (isOpen) this.setState({ isOpen: false });
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
      unStyledButton,
      children,
    } = this.props;

    if (!items) return null;

    let dropdownClassNames = `Dropdown Dropdown--${menuPos || 'left'}`;
    if (menuFor) dropdownClassNames += ` Dropdown__${menuFor}`;
    dropdownClassNames += ` Dropdown--${isOpen ? 'show' : 'hide'}`;

    return (
      <div className={dropdownClassNames}>
        <Button unStyled={unStyledButton} buttonFor="dropdown" onClick={this.handleTogglerClick}>
          <div className="Dropdown__title">
            {togglerText || children}
          </div>
        </Button>
        <Menu menuFor="dropdown" items={items} />
      </div>
    );
  }
}

export default onClickOutside(Dropdown);

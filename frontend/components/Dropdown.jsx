import React from 'react';
import onClickOutside from 'react-onclickoutside';
import Menu from './Menu';
import DropdownButton from './DropdownButton';
import './Dropdown.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, focusIndex: -1 };
    this.handleTogglerClick = this.handleTogglerClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.ddWrapper = React.createRef();
  }

  componentDidUpdate(_, prevState) {
    const { isOpen, focusIndex } = this.state;
    if (!prevState.isOpen && isOpen) this.focusItem(focusIndex);
    if (prevState.isOpen && !isOpen) this.setItemIndex(-1);
  }

  setItemIndex(nextIndex) {
    const { focusIndex } = this.state;
    if (focusIndex !== nextIndex) this.setState({ focusIndex: nextIndex });
    return nextIndex;
  }

  getItemNode(index) {
    const menuNode = this.ddWrapper.current.children[1];
    const itemNode = menuNode.children[index];
    return itemNode && itemNode.children[0];
  }

  handleClickOutside() {
    const { isOpen } = this.state;
    if (isOpen) this.setState({ isOpen: false });
  }

  handleTogglerClick() {
    const { isOpen, focusIndex } = this.state;
    const nextState = { isOpen: !isOpen };
    if (nextState.isOpen && focusIndex !== 0) nextState.focusIndex = 0;
    this.setState(nextState);
  }

  focusItem(index) {
    this.setItemIndex(index);
    if (index === -1) return null;
    const itemNode = this.getItemNode(index);
    return itemNode && itemNode.focus();
  }

  nextItemIndex() {
    const { items } = this.props;
    const { focusIndex } = this.state;
    const lastIndex = items.length - 1;

    return {
      popIndex: () => (focusIndex <= 0 ? lastIndex : focusIndex - 1),
      pushIndex: () => (focusIndex === lastIndex ? 0 : focusIndex + 1),
    };
  }

  handleKeyDown(e) {
    const { items } = this.props;
    const { isOpen } = this.state;

    const ddTogglerNode = e.currentTarget.children[0];
    const index = this.nextItemIndex();
    let nextIndex = -1;
    let flag = false;

    if (e.key === 'Tab' && isOpen) {
      this.handleTogglerClick();
    } else if (e.key === 'Home' && isOpen) {
      nextIndex = 0;
      flag = true;
    } else if (e.key === 'End' && isOpen) {
      nextIndex = items.length - 1;
      flag = true;
    } else if (e.key === 'ArrowDown') {
      nextIndex = index.pushIndex();
      flag = true;
    } else if (e.key === 'ArrowUp') {
      nextIndex = index.popIndex();
      flag = true;
    } else if (e.key === 'Escape' && isOpen) {
      ddTogglerNode.focus();
      flag = true;
    }

    // console.log(this.itemLetterSpliceHash());

    if (flag) {
      this.focusItem(nextIndex);
      e.preventDefault();
      e.stopPropagation();
    }
  }

  itemLetterSpliceHash() {
    const { items } = this.props;

    // const letters = items.map(({ label }) => {
    //   const letter = label.substring(0, 1);
    //   const upCase = letter.toUpperCase();
    //   const lowCase = letter.toLowerCase();
    //   return 
    // });

    return items.reduce((acc, { label }, i) => {
      const letter = label.substring(0, 1);
      const upCase = letter.toUpperCase();
      const lowCase = letter.toLowerCase();
      acc[upCase] = acc[upCase] ? acc[upCase].push(i) : [i];
      acc[lowCase] = acc[lowCase] ? acc[lowCase].push(i) : [i];
      return acc;
    }, {});
  }

  render() {
    const { isOpen } = this.state;
    const {
      menuFor,
      menuPos,
      items,
      togglerText,
    } = this.props;

    if (!items) return null;

    let dropdownClassNames = `Dropdown Dropdown--${menuPos || 'left'}`;
    if (menuFor) dropdownClassNames += ` Dropdown__${menuFor}`;
    dropdownClassNames += ` Dropdown--${isOpen ? 'show' : 'hide'}`;

    return (
      <div
        ref={this.ddWrapper}
        role="presentation"
        className={dropdownClassNames}
        onKeyDown={this.handleKeyDown}
      >
        <DropdownButton
          togglerText={togglerText}
          togglerClick={this.handleTogglerClick}
          isOpen={isOpen}
        />
        <Menu
          id="ddMenu"
          role="menu"
          menuFor="dropdown"
          aria-labelledby="ddToggler"
          items={items}
        />
      </div>
    );
  }
}

export default onClickOutside(Dropdown);

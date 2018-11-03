import React from 'react';
import classNames from 'classnames';
import MenuItem from './MenuItem';
import './Menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.menu = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { shouldPos, handleStyleFromHeight, isDdOpen } = this.props;

    if (shouldPos && this.menu.current) {
      if (!prevProps.isDdOpen && isDdOpen) {
        const { height } = this.menu.current.getBoundingClientRect();
        handleStyleFromHeight(height);
      }
    }
  }

  render() {
    const {
      items,
      isDdOpen,
      menuFor,
      isRow,
      inverseColor,
      shouldPos,
      toggleMenu,
      handleStyleFromHeight,
      unStyled,
      ...props
    } = this.props;

    const menuClassNames = classNames('Menu', {
      [`Menu--${menuFor}`]: menuFor,
      'Menu--row': isRow,
      Menu__styled: !unStyled,
      Menu__unstyled: unStyled,
    });

    return (
      <ul role="menu" ref={this.menu} className={menuClassNames} {...props}>
        {items && items.map(({
          link,
          className,
          key: keyId,
          ...item
        }) => (
          <MenuItem
            key={keyId || item.label + (link || '')}
            role="menuitem"
            keyId={keyId}
            to={link}
            className="MenuItem"
            toggleMenu={toggleMenu}
            {...item}
          />
        ))}
      </ul>
    );
  }
}

export default Menu;

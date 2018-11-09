import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import LinkWithDrawer from '../util/linkUtil';
import './MenuItem.css';
import Dropdown from './Dropdown';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { onClick, toggleMenu } = this.props;

    if (onClick) {
      onClick();
    }

    if (toggleMenu) {
      toggleMenu();
    }
  }

  render() {
    const {
      className,
      icon,
      keyId,
      label,
      altClassName,
      modifierClassName,
      onClick,
      toggleMenu,
      isItemActive,
      isActive,
      items,
      ...props
    } = this.props;

    const { to: link } = props;

    const itemProps = Object.assign({}, props);
    itemProps.onClick = this.handleOnClick;

    let itemType = 'link';
    if (items) {
      itemType = 'dropdown';
    } else if (!link && onClick) {
      itemType = 'btn';
    } else {
      itemType = 'text';
    }

    const itemClassNames = classNames(className, {
      [`MenuItem--${itemType}`]: itemType,
      [`MenuItem__${altClassName}`]: altClassName,
      [`MenuItem__${keyId}`]: keyId,
      [`MenuItem__${keyId}--${modifierClassName}`]: keyId && modifierClassName,
      [`MenuItem--${modifierClassName}`]: !keyId && modifierClassName,
    });

    const contentClassNames = classNames('MenuItem__content', {
      [`MenuItem__content--${itemType}`]: itemType,
      'MenuItem__content--active': isItemActive,
    });

    return (
      <li className={itemClassNames}>
        {itemType === 'link' && (
          <LinkWithDrawer
            isNavLink
            className={contentClassNames}
            onClick={this.handleOnClick}
            activeClassName="MenuItem__content--active"
            {...itemProps}
          >
            {icon}
            {label}
          </LinkWithDrawer>
        )}

        {itemType === 'dropdown' && (
          <Dropdown items={items} {...itemProps}>
            {icon}
            {label}
          </Dropdown>
        )}

        {itemType === 'btn' && (
          <Button className={contentClassNames} {...itemProps}>
            {icon}
            {label}
          </Button>
        )}

        {itemType === 'text' && (
          <span className={contentClassNames} {...itemProps}>
            {icon}
            {label}
          </span>
        )}
      </li>
    );
  }
}

export default MenuItem;

import React, { Fragment } from 'react';
import classNames from 'classnames';
import Button from './Button';
import LinkWithDrawer from '../util/linkUtil';
import Dropdown from './Dropdown';
import './MenuItem.css';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    const { onClick, toggleMenu } = this.props;

    if (onClick) {
      onClick(e);
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
      condition,
      items,
      ...props
    } = this.props;

    if (condition !== undefined && !condition) {
      return null;
    }

    const { to: link } = props;

    const itemProps = { ...props };
    itemProps.onClick = this.handleOnClick;

    let itemType = 'link';
    if (items) {
      itemType = 'dropdown';
    } else if (!link && onClick) {
      itemType = 'btn';
    } else if (!link && !onClick) {
      itemType = 'text';
    }

    const iconAndLabelText = (
      <Fragment>
        {icon && <span className="MenuItem__icon">{icon}</span>}
        {label}
      </Fragment>
    );

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
            {iconAndLabelText}
          </LinkWithDrawer>
        )}

        {itemType === 'dropdown' && (
          <Dropdown items={items} {...itemProps}>{iconAndLabelText}</Dropdown>
        )}

        {itemType === 'btn' && (
          <Button className={contentClassNames} {...itemProps}>{iconAndLabelText}</Button>
        )}

        {itemType === 'text' && (
          <span className={contentClassNames} {...itemProps}>{iconAndLabelText}</span>
        )}
      </li>
    );
  }
}

export default MenuItem;

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';

const mapStateToProps = state => ({
  isDrawerOpen: !!state.ui.drawer.drawerType,
  drawerType: state.ui.drawer.drawerType,
  drawerSlug: state.ui.drawer.drawerSlug,
});

const LinkWithDrawer = ({
  to,
  isNavLink,
  isDrawerOpen,
  hasNoDrawer,
  drawerType,
  drawerSlug,
  staticContext,
  dispatch,
  match,
  history,
  ...props
}) => {
  let linkTo = to;

  if (isDrawerOpen && !hasNoDrawer) {
    linkTo += `/${drawerType}`;

    if (drawerSlug) {
      linkTo += `/${drawerSlug}`;
    }
  }

  if (isNavLink) {
    return <NavLink to={linkTo} {...props} />;
  }

  return <Link to={linkTo} {...props} />;
};

export default withRouter(connect(mapStateToProps)(LinkWithDrawer));

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const LinkForWorkspace = ({ match: { params } }, to, ...props) => (
  <Link to={`/${params.workspaceSlug}${to}`} {...props} />
);

const LinkForChannel = ({ match: { params } }, to, ...props) => (
  <Link to={`/${params.workspaceSlug}/${params.channelSlug}${to}`} {...props} />
);

export const WorkspaceLink = withRouter(LinkForWorkspace);
export const ChannelLink = withRouter(LinkForChannel);

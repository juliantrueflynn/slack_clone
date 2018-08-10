import React from 'react';
import Menu from './Menu';

const ChannelsMenu = ({ subbedChannels, workspaceSlug }) => {
  const items = subbedChannels.map(item => ({
    key: item.slug,
    label: item.title,
    link: `/${workspaceSlug}/${item.slug}`,
  }));

  return (
    <Menu items={items} menuFor="channels" />
  );
};

export default ChannelsMenu;

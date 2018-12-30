import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from './Avatar';
import FormField from './FormField';
import SidebarWidget from './SidebarWidget';
import './ModalSearchSidebar.css';

const ModalSearchSidebar = ({
  messages,
  channels,
  users,
  peopleFilter,
  channelFilter,
  toggleCheckbox,
}) => {
  const channelsFilterMap = channels.map(({ slug: id, title }) => ({ id, title }));

  const peopleFilterMap = messages.reduce((acc, curr) => {
    const { authorSlug: id, username: title } = curr;
    acc[id] = { id, title };
    return acc;
  }, {});

  const isChecked = {
    people: id => peopleFilter.includes(id),
    channel: id => channelFilter.includes(id),
  };

  const checkboxMapper = ({ id, title }, type, prefix) => ({
    id,
    type: 'checkbox',
    label: (
      <Fragment>
        <div className="ModalSearchSidebar__filter-prefix">{prefix}</div>
        {title}
      </Fragment>
    ),
    className: null,
    checked: isChecked[type](id),
    onChange: toggleCheckbox,
    'data-filter': `${type}Filter`,
  });

  const peopleFilters = Object.values(peopleFilterMap).map(item => (
    checkboxMapper(item, 'people', <Avatar user={users[item.id]} size="18" />)
  ));

  const channelsFilters = channelsFilterMap.map(item => (
    checkboxMapper(item, 'channel', <FontAwesomeIcon icon="hashtag" size="sm" />)
  ));

  return (
    <aside className="ModalSearchSidebar">
      <h3 className="ModalSearchSidebar__title">Filter by</h3>
      <SidebarWidget widgetFor="people" widgetTitle="People">
        {peopleFilters.map(item => <FormField key={item.id} {...item} />)}
      </SidebarWidget>
      <SidebarWidget widgetFor="channels" widgetTitle="Channels">
        {channelsFilters.map(item => <FormField key={item.id} {...item} />)}
      </SidebarWidget>
    </aside>
  );
};

export default ModalSearchSidebar;

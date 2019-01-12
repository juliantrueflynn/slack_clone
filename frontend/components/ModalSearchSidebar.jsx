import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from './Avatar';
import FormField from './FormField';
import SidebarWidget from './SidebarWidget';
import './ModalSearchSidebar.css';

const ModalSearchSidebar = ({
  isLoading,
  messages,
  chatroomsMap,
  usersMap,
  peopleFilter,
  channelFilter,
  toggleCheckbox,
}) => {
  const channelsFilterMap = messages.reduce((acc, curr) => {
    const ch = chatroomsMap[curr.chatroomSlug];
    acc[ch.slug] = { id: ch.slug, title: ch.title, filter: 'channel' };
    return acc;
  }, {});

  const peopleFilterMap = messages.reduce((acc, curr) => {
    const { authorSlug: id, username: title } = curr;
    acc[id] = { id, title, filter: 'people' };
    return acc;
  }, {});

  const isChecked = {
    people: id => peopleFilter.includes(id),
    channel: id => channelFilter.includes(id),
  };

  const checkboxMapper = ({ id, title, filter }, prefix) => ({
    id,
    type: 'checkbox',
    label: (
      <Fragment>
        <div className="ModalSearchSidebar__filter-prefix">{prefix}</div>
        {title}
      </Fragment>
    ),
    className: null,
    checked: isChecked[filter](id),
    onChange: toggleCheckbox,
    'data-filter': `${filter}Filter`,
  });

  const peopleFilters = Object.values(peopleFilterMap).map(item => (
    checkboxMapper(item, <Avatar user={usersMap[item.id]} size="18" />)
  ));

  const channelsFilters = Object.values(channelsFilterMap).map(item => (
    checkboxMapper(item, <FontAwesomeIcon icon="hashtag" size="sm" />)
  ));

  const hasPeople = !(peopleFilters.length);
  const hasChannels = !(channelsFilters.length);

  return (
    <aside className="ModalSearchSidebar">
      <h3 className="ModalSearchSidebar__title">Filter by</h3>
      <SidebarWidget widgetFor="people" widgetTitle="People">
        {isLoading || peopleFilters.map(item => <FormField key={item.id} {...item} />)}
        {!isLoading && hasPeople && (
          <div className="ModalSearchSidebar__empty">
            No authors match results
          </div>
        )}
      </SidebarWidget>
      <SidebarWidget widgetFor="channels" widgetTitle="Channels">
        {channelsFilters.map(item => <FormField key={item.id} {...item} />)}
        {!isLoading && hasChannels && (
          <div className="ModalSearchSidebar__empty">
            No channels match results
          </div>
        )}
      </SidebarWidget>
    </aside>
  );
};

export default ModalSearchSidebar;

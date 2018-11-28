import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from './Avatar';
import FormField from './FormField';
import './SearchModalAside.css';

const SearchModalAside = ({
  messages,
  channelsMap,
  users,
  peopleFilter,
  channelFilter,
  toggleCheckbox,
}) => {
  const channelsFilterMap = messages.reduce((acc, curr) => {
    const channel = channelsMap[curr.channelSlug];
    const { channelSlug: id } = curr;
    acc[id] = { id, label: channel.title };
    return acc;
  }, {});
  const peopleFilterMap = messages.reduce((acc, curr) => {
    const { authorSlug: id, username: label } = curr;
    acc[id] = { id, label };
    return acc;
  }, {});

  const isChecked = {
    people: id => peopleFilter.includes(id),
    channel: id => channelFilter.includes(id),
  };

  const checkboxMapper = ({ id, label }, type, prefix) => ({
    id,
    type: 'checkbox',
    label: (
      <Fragment>
        <div className="SearchModalAside__filter-prefix">{prefix}</div>
        {label}
      </Fragment>
    ),
    className: null,
    checked: isChecked[type](id),
    onChange: () => toggleCheckbox(`${type}Filter`, id),
  });

  const people = Object.values(peopleFilterMap).map(item => (
    checkboxMapper(item, 'people', <Avatar user={users[item.id]} size="18" />)
  ));

  const channels = Object.values(channelsFilterMap).map(item => (
    checkboxMapper(item, 'channel', <FontAwesomeIcon icon="hashtag" size="sm" />)
  ));

  const widget = (title, arr) => (
    <div className={`SearchModalAside__widget SearchModalAside__widget-${title.toLowerCase()}`}>
      <h4 className="SearchModalAside__widget-title">{title}</h4>
      {arr.map(item => <FormField key={item.id} {...item} />)}
    </div>
  );

  return (
    <aside className="SearchModalAside">
      <h3 className="SearchModalAside__title">Filter by</h3>
      {widget('People', people)}
      {widget('Channels', channels)}
    </aside>
  );
};

export default SearchModalAside;

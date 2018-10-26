import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchModalFilter from './SearchModalFilter';
import Avatar from './Avatar';
import './SearchModalAside.css';

const SearchModalAside = ({
  messages,
  users,
  peopleFilter,
  channelFilter,
  handleFilterToggle,
}) => {
  const channelsMap = messages.reduce((acc, curr) => {
    const { channelSlug: id, channelTitle: label } = curr;
    acc[id] = { id, label };
    return acc;
  }, {});
  const peopleMap = messages.reduce((acc, curr) => {
    const { authorSlug: id, authorName: label } = curr;
    acc[id] = { id, label };
    return acc;
  }, {});

  const people = Object.values(peopleMap);
  const channels = Object.values(channelsMap);

  return (
    <aside className="SearchModalAside">
      <h3 className="SearchModalAside__title">Filter by</h3>
      <div className="SearchModalAside__widget">
        <h4 className="SearchModalAside__widget-title">People</h4>
        {people.map(author => (
          <SearchModalFilter
            key={author.id}
            filterType="people"
            filterState={peopleFilter}
            toggle={handleFilterToggle}
            {...author}
          >
            <Avatar author={users[author.id]} size="18" />
          </SearchModalFilter>
        ))}
      </div>
      <div className="SearchModalAside__widget">
        <h4 className="SearchModalAside__widget-title">Channels</h4>
        {channels.map(channel => (
          <SearchModalFilter
            key={channel.id}
            filterType="channel"
            filterState={channelFilter}
            toggle={handleFilterToggle}
            {...channel}
          >
            <FontAwesomeIcon icon="hashtag" size="sm" />
          </SearchModalFilter>
        ))}
      </div>
    </aside>
  );
};

export default SearchModalAside;

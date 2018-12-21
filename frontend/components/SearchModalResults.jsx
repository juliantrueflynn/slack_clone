import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchModalItem from './SearchModalItem';
import './SearchModalResults.css';

const SearchModalResults = ({
  results,
  isLoading,
  users,
  channelsMap,
  match: { url },
}) => {
  let resultsText = `${results.length} results`;
  if (results.length === 0) {
    resultsText = 'No matches found';
  }

  return (
    <div className="SearchModalResults">
      <span className="SearchModalResults__loading-txt">Loading</span>
      <span className="SearchModalResults__empty-txt">Type and hit enter to search</span>
      <h4 className="SearchModalResults__count-txt">{resultsText}</h4>
      {isLoading || results.map(message => (
        <SearchModalItem
          key={message.slug}
          message={message}
          users={users}
          channelsMap={channelsMap}
          url={url}
        />
      ))}
    </div>
  );
};

export default withRouter(SearchModalResults);

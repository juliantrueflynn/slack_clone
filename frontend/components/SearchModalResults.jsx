import React from 'react';
import SearchModalItem from './SearchModalItem';
import './SearchModalResults.css';

const SearchModalResults = ({ results, isLoading, users }) => {
  const loadingText = isLoading && 'Loading';
  let resultsText = `${results.length} results`;
  if (results.length === 0) {
    resultsText = 'No matches found';
  }

  return (
    <div className="SearchModalResults">
      <span className="SearchModalResults__empty-txt">Type and hit enter to search</span>
      <h4 className="SearchModalResults__count">
        {resultsText}
      </h4>
      {loadingText}
      {isLoading || results.map(message => (
        <SearchModalItem key={message.id} message={message} users={users} />
      ))}
    </div>
  );
};

export default SearchModalResults;

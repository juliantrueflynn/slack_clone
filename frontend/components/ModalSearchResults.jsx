import React from 'react';
import { withRouter } from 'react-router-dom';
import ModalSearchItem from './ModalSearchItem';
import './ModalSearchResults.css';

const ModalSearchResults = ({
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
    <div className="ModalSearchResults">
      <span className="ModalSearchResults__loading-txt">Loading</span>
      <span className="ModalSearchResults__empty-txt">Type and hit enter to search</span>
      <h4 className="ModalSearchResults__count-txt">{resultsText}</h4>
      {isLoading || results.map(message => (
        <ModalSearchItem
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

export default withRouter(ModalSearchResults);

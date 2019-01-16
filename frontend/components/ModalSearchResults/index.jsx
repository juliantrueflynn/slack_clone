import React from 'react';
import { withRouter } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalSearchItem from '../ModalSearchItem';
import './styles.css';

const ModalSearchResults = ({ results, chatroomsMap, match: { url } }) => {
  let resultsText = `${results.length} results`;
  if (results.length === 0) {
    resultsText = 'No matches found';
  }

  return (
    <div className="ModalSearchResults">
      <div className="ModalSearchResults__loader">
        <FontAwesomeIcon icon={faSpinner} spin pulse />
      </div>
      <span className="ModalSearchResults__txt ModalSearchResults__txt--empty">
        Type and hit enter to search
      </span>
      <h4 className="ModalSearchResults__txt ModalSearchResults__txt--count">
        {resultsText}
      </h4>
      {results.map(message => (
        <ModalSearchItem
          key={message.slug}
          message={message}
          chatroomsMap={chatroomsMap}
          url={url}
        />
      ))}
    </div>
  );
};

export default withRouter(ModalSearchResults);

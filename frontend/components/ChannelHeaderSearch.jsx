import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Button from './Button';
import './ChannelHeaderSearch.css';

const ChannelHeaderSearch = ({ query, modalOpen, destroySearch }) => {
  const modalOpenSearch = () => modalOpen('MODAL_SEARCH');
  const placeholder = query || 'Search';
  const clear = () => destroySearch();

  const searchClassNames = classNames('ChannelHeaderSearch', {
    'ChannelHeaderSearch--queried': query,
    'ChannelHeaderSearch--empty': !query,
  });

  return (
    <div className={searchClassNames}>
      <Button onClick={modalOpenSearch} buttonFor="nav-search" unStyled>
        <FontAwesomeIcon icon="search" size="lg" />
        <span className="Btn__nav-search-txt">
          {placeholder}
        </span>
      </Button>
      {query && (
        <Button buttonFor="clear" onClick={clear} unStyled>
          <FontAwesomeIcon icon="times" />
        </Button>
      )}
    </div>
  );
};

export default ChannelHeaderSearch;

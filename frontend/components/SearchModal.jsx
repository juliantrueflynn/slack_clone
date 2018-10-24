import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import SearchModalItem from './SearchModalItem';
import Button from './Button';
import withModal from './withModal';
import './SearchModal.css';

const SearchModal = ({
  users,
  messages,
  channels,
  fetchSearchRequest,
  destroySearch,
  query,
  modalClose,
  isSearchLoading,
}) => {
  const close = () => modalClose();

  return (
    <div className="SearchModal">
      <header className="SearchModal__searchbar">
        <SearchBar
          fetchSearchRequest={fetchSearchRequest}
          destroySearch={destroySearch}
          searchQuery={query}
        />
        <Button onClick={close} buttonFor="modal-close" unStyled>
          <FontAwesomeIcon icon="times" />
        </Button>
      </header>
      <div className="SearchModal__scroller">
        <div className="SearchModal__body">
          {isSearchLoading && 'Loading'}
          {isSearchLoading || messages.map(message => (
            <SearchModalItem
              key={message.id}
              message={message}
              channels={channels}
              users={users}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const modalProps = {
  modalType: 'MODAL_SEARCH',
  unStyled: true,
  shouldCloseOnOverlayClick: true,
};

export default withModal(modalProps)(SearchModal);

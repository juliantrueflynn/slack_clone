import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import SearchModalItem from './SearchModalItem';
import Button from './Button';
import withModal from './withModal';
import './SearchModal.css';

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(query) {
    this.setState({ query });
  }

  render() {
    const {
      users,
      messages,
      fetchSearchRequest,
      destroySearch,
      modalClose,
      isSearchLoading,
    } = this.props;
    const { query } = this.state;
    const close = () => modalClose();
    const hasLen = !!messages.length;

    const searchClassNames = classNames('SearchModal', {
      'SearchModal--fill': hasLen,
      'SearchModal--empty': !hasLen,
      'SearchModal--loading': isSearchLoading,
    });

    return (
      <div className={searchClassNames}>
        <header className="SearchModal__searchbar">
          <SearchBar
            fetchSearchRequest={fetchSearchRequest}
            destroySearch={destroySearch}
            setQuery={this.handleQuery}
            query={query}
          />
          <Button onClick={close} buttonFor="modal-close" unStyled>
            <FontAwesomeIcon icon="times" />
          </Button>
        </header>
        <div className="SearchModal__scroller">
          <div className="SearchModal__body">
            {hasLen || (<span className="SearchModal__empty-txt">Type and hit enter to search</span>)}
            {isSearchLoading && 'Loading'}
            {isSearchLoading || messages.map(message => (
              <SearchModalItem key={message.id} message={message} users={users} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const modalProps = {
  modalType: 'MODAL_SEARCH',
  unStyled: true,
  shouldCloseOnOverlayClick: true,
};

export default withModal(modalProps)(SearchModal);

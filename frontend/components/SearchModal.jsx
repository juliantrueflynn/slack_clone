import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import SearchModalItem from './SearchModalItem';
import SearchModalFilter from './SearchModalFilter';
import Avatar from './Avatar';
import Button from './Button';
import withModal from './withModal';
import './SearchModal.css';

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      channelFilter: [],
      peopleFilter: [],
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleFilterToggle = this.handleFilterToggle.bind(this);
  }

  handleQuery(query) {
    this.setState({ query });
  }

  handleFilterToggle(type, slug) {
    const { ...state } = this.state;
    const stateFilter = state[type];
    let nextState = stateFilter;

    if (stateFilter.includes(slug)) {
      nextState = stateFilter.filter(entitySlug => entitySlug !== slug);
    } else {
      stateFilter.push(slug);
      nextState = stateFilter;
    }

    this.setState({ [type]: nextState });
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
    const { query, channelFilter, peopleFilter } = this.state;
    const close = () => modalClose();
    const hasLen = !!messages.length;
    const loadingText = isSearchLoading && 'Loading';

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
    const channels = Object.values(channelsMap);
    const people = Object.values(peopleMap);

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
            <div className="SearchModal__row">
              <div className="SearchModal__results">
                <span className="SearchModal__empty-txt">Type and hit enter to search</span>
                <h4 className="SearchModal__results-count">
                  {`${messages.length} results`}
                </h4>
                {loadingText}
                {isSearchLoading || messages.map(message => (
                  <SearchModalItem key={message.id} message={message} users={users} />
                ))}
              </div>
              <aside className="SearchModal__aside">
                <h3 className="SearchModal__aside-title">Filter by</h3>
                <div className="SearchModal__widget">
                  <h4 className="SearchModal__widget-title">People</h4>
                  {people.map(author => (
                    <SearchModalFilter
                      key={author.id}
                      filterType="people"
                      filterState={peopleFilter}
                      toggle={this.handleFilterToggle}
                      {...author}
                    >
                      <Avatar author={users[author.id]} size="18" />
                    </SearchModalFilter>
                  ))}
                </div>
                <div className="SearchModal__widget">
                  <h4 className="SearchModal__widget-title">Channels</h4>
                  {channels.map(channel => (
                    <SearchModalFilter
                      key={channel.id}
                      filterType="channel"
                      filterState={channelFilter}
                      toggle={this.handleFilterToggle}
                      {...channel}
                    >
                      <FontAwesomeIcon icon="hashtag" size="sm" />
                    </SearchModalFilter>
                  ))}
                </div>
              </aside>
            </div>
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

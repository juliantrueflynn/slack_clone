import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import Button from './Button';
import ScrollBar from './ScrollBar';
import SearchModalResults from './SearchModalResults';
import SearchModalAside from './SearchModalAside';
import Modal from './Modal';
import './SearchModal.css';

class SearchModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      isNewSearch: true,
      results: [],
      channelFilter: [],
      peopleFilter: [],
    };

    this.setQuery = this.setQuery.bind(this);
    this.handleFilterToggle = this.handleFilterToggle.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { searchQuery: query } = this.props;
    this.setState({ query });

    if (query) {
      this.handleSearchRequest(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { messages, searchQuery } = this.props;
    const {
      query,
      isNewSearch,
      results,
      channelFilter,
      peopleFilter,
    } = this.state;
    const prevLastMsg = prevProps.messages[prevProps.messages.length - 1];
    const lastMsg = messages[messages.length - 1];
    const hasChannelFilterDiff = channelFilter.length === prevState.channelFilter.length;
    const hasPeopleFilterDiff = peopleFilter.length === prevState.peopleFilter.length;

    if (searchQuery && prevProps.searchQuery !== searchQuery) {
      this.setResults(messages);
    }

    if (searchQuery && searchQuery !== query && prevState.query !== query) {
      this.setResults([]);
      this.setIsNewSearch(true);
    }

    if ((hasChannelFilterDiff || hasPeopleFilterDiff) && !isNewSearch) {
      if (lastMsg && !results.length && !channelFilter.length && !peopleFilter.length) {
        this.setResults(messages);
      }

      if (lastMsg && prevLastMsg && lastMsg.id !== prevLastMsg.id) {
        this.setResults(messages);
      }
    }
  }

  setResults(results) {
    this.setState({ results });
  }

  setIsNewSearch(isNewSearch) {
    this.setState({ isNewSearch });
  }

  setQuery(query) {
    this.setState({ query });
  }

  handleSearchRequest(query) {
    const { fetchSearchRequest } = this.props;

    this.setState({ isNewSearch: false });
    fetchSearchRequest(query);
  }

  filterResults(newFilter, currFilter) {
    const { messages } = this.props;

    return messages.filter(({ authorSlug, channelSlug }) => (
      !newFilter.length || (newFilter.includes(authorSlug) || newFilter.includes(channelSlug))
    )).filter(({ authorSlug, channelSlug }) => (
      !currFilter.length || (currFilter.includes(authorSlug) || currFilter.includes(channelSlug))
    ));
  }

  handleFilterToggle(type, slug) {
    const { ...state } = this.state;
    const stateFilter = state[type];
    let newFilter = stateFilter;

    if (stateFilter.includes(slug)) {
      newFilter = stateFilter.filter(entitySlug => entitySlug !== slug);
    } else {
      stateFilter.push(slug);
      newFilter = stateFilter;
    }

    const altType = type === 'channelFilter' ? state.peopleFilter : state.channelFilter;
    const results = this.filterResults(newFilter, altType);

    this.setState({ [type]: newFilter, results });
  }

  handleClose() {
    const { modalClose, fetchSearchRequest, searchQuery } = this.props;
    const { query } = this.state;

    if (searchQuery !== query) {
      fetchSearchRequest(query, true);
    }

    modalClose();
  }

  render() {
    const {
      users,
      currentUserId,
      messages,
      channelsMap,
      destroySearch,
      isSearchLoading,
    } = this.props;
    const {
      query,
      results,
      channelFilter,
      peopleFilter,
      isNewSearch,
    } = this.state;

    const isEmpty = !results.length && !peopleFilter.length && !channelFilter.length;

    const overlayClassNames = classNames('Modal__overlay SearchModal', {
      'SearchModal--empty': isEmpty && !isNewSearch && !isSearchLoading,
      'SearchModal--loading': isSearchLoading,
      'SearchModal--new': isNewSearch,
    });

    return (
      <Modal
        isOpen
        modalFor="search"
        close={this.handleClose}
        overlayClassName={overlayClassNames}
        hasDarkOverlay
        unStyled
      >
        <div className="SearchModal__searchbar">
          <SearchBar
            searchSubmit={this.handleSearchRequest}
            destroySearch={destroySearch}
            setQuery={this.setQuery}
            query={query}
          />
          <Button onClick={this.handleClose} buttonFor="modal-close" unStyled>
            <FontAwesomeIcon icon="times" />
          </Button>
        </div>
        <ScrollBar>
          <SearchModalResults
            results={results}
            isLoading={isSearchLoading}
            users={users}
            currentUserId={currentUserId}
            channelsMap={channelsMap}
          />
          <SearchModalAside
            messages={messages}
            channelsMap={channelsMap}
            users={users}
            peopleFilter={peopleFilter}
            channelFilter={channelFilter}
            toggleCheckbox={this.handleFilterToggle}
          />
        </ScrollBar>
      </Modal>
    );
  }
}

export default SearchModal;

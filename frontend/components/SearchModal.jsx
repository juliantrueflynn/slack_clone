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
      results: [],
      channelFilter: [],
      peopleFilter: [],
    };

    this.setQuery = this.setQuery.bind(this);
    this.handleFilterToggle = this.handleFilterToggle.bind(this);
  }

  componentDidMount() {
    const { searchQuery: query, fetchSearchRequest } = this.props;
    this.setState({ query });

    if (query) {
      fetchSearchRequest(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { messages } = this.props;
    const { results, channelFilter, peopleFilter } = this.state;
    const prevLastMsg = prevProps.messages[prevProps.messages.length - 1];
    const lastMsg = messages[messages.length - 1];
    const hasChannelFilterDiff = channelFilter.length === prevState.channelFilter.length;
    const hasPeopleFilterDiff = peopleFilter.length === prevState.peopleFilter.length;

    if (hasChannelFilterDiff || hasPeopleFilterDiff) {
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

  setQuery(query) {
    this.setState({ query });
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

  render() {
    const {
      users,
      messages,
      fetchSearchRequest,
      createSearch,
      destroySearch,
      modalClose,
      isSearchLoading,
    } = this.props;

    const {
      query,
      results,
      channelFilter,
      peopleFilter,
    } = this.state;

    const hasLen = !!results.length;
    const isEmpty = !hasLen && !peopleFilter.length && !channelFilter.length;

    const searchClassNames = classNames('SearchModal', {
      'SearchModal--fill': hasLen,
      'SearchModal--empty': isEmpty,
      'SearchModal--loading': isSearchLoading,
    });
    const overlayClassNames = classNames('Modal__overlay Modal__overlay--search', {
      'Modal__overlay--search-empty': isEmpty,
    });

    return (
      <Modal
        modalFor="search"
        isOpen
        close={modalClose}
        overlayClassName={overlayClassNames}
        unStyled
      >
        <div className={searchClassNames} ref={this.container}>
          <div className="SearchModal__searchbar">
            <SearchBar
              fetchSearchRequest={fetchSearchRequest}
              createSearch={createSearch}
              destroySearch={destroySearch}
              setQuery={this.setQuery}
              query={query}
            />
            <Button onClick={() => modalClose()} buttonFor="modal-close" unStyled>
              <FontAwesomeIcon icon="times" />
            </Button>
          </div>
          <ScrollBar>
            <SearchModalResults
              results={results}
              isLoading={isSearchLoading}
              users={users}
            />
            <SearchModalAside
              messages={messages}
              users={users}
              peopleFilter={peopleFilter}
              channelFilter={channelFilter}
              handleFilterToggle={this.handleFilterToggle}
            />
          </ScrollBar>
        </div>
      </Modal>
    );
  }
}

export default SearchModal;

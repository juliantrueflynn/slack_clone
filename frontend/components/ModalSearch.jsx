import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import Button from './Button';
import ScrollBar from './ScrollBar';
import ModalSearchResults from './ModalSearchResults';
import ModalSearchAside from './ModalSearchAside';
import withWindowResize from './withWindowResize';
import './ModalSearch.css';

class ModalSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      isNewSearch: true,
      results: [],
      channelFilter: [],
      peopleFilter: [],
      height: 0,
    };

    this.scrollBarRef = React.createRef();

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
    const { messages, searchQuery, windowHeight } = this.props;
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

    if (results.length) {
      const { top } = this.scrollBarRef.current.getBoundingClientRect();
      const bottomPadding = 8;
      this.updateHeight(windowHeight - top - bottomPadding);
    } else {
      this.updateHeight('inherit');
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

  updateHeight(nextHeight) {
    const { height } = this.state;

    if (height !== nextHeight) {
      this.setState({ height: nextHeight });
    }
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
    const { close, fetchSearchRequest, searchQuery } = this.props;
    const { query } = this.state;

    if (searchQuery !== query) {
      fetchSearchRequest(query, true);
    }

    close();
  }

  render() {
    const {
      users,
      messages,
      channelsMap,
      destroySearch,
      isLoading,
    } = this.props;
    const {
      query,
      results,
      channelFilter,
      peopleFilter,
      isNewSearch,
      height,
    } = this.state;

    const isEmpty = !results.length && !peopleFilter.length && !channelFilter.length;

    const overlayClassName = classNames('ModalSearch', {
      'ModalSearch--empty': isEmpty && !isNewSearch && !isLoading,
      'ModalSearch--loading': isLoading,
      'ModalSearch--new': isNewSearch,
    });

    return (
      <div className={overlayClassName}>
        <div className="ModalSearch__searchbar">
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
        <ScrollBar scrollBarRef={this.scrollBarRef} style={{ height }}>
          <ModalSearchResults
            results={results}
            isLoading={isLoading}
            users={users}
            channelsMap={channelsMap}
          />
          <ModalSearchAside
            messages={messages}
            channelsMap={channelsMap}
            users={users}
            peopleFilter={peopleFilter}
            channelFilter={channelFilter}
            toggleCheckbox={this.handleFilterToggle}
          />
        </ScrollBar>
      </div>
    );
  }
}

export default withWindowResize(ModalSearch);

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
      height: 'inherit',
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

  componentDidUpdate(prevProps) {
    const { messages, windowHeight } = this.props;
    const { height, isNewSearch } = this.state;

    if (messages.length !== prevProps.messages.length) {
      this.setResults(messages);
    }

    if (height === 'inherit' || windowHeight !== prevProps.windowHeight) {
      if (messages.length || !isNewSearch) {
        const { top } = this.scrollBarRef.current.getBoundingClientRect();
        const bottomPadding = 8;
        this.updateHeight(windowHeight - top - bottomPadding);
      } else {
        this.updateHeight('inherit');
      }
    }
  }

  setQuery(query) {
    this.setState({ query });

    if (!query) {
      this.setResults([]);
      this.setNewSearch(true);
    }
  }

  setResults(results) {
    this.setState({ results });
  }

  setNewSearch(isNewSearch) {
    this.setState({ isNewSearch });
  }

  updateHeight(nextHeight) {
    const { height } = this.state;

    if (height !== nextHeight) {
      this.setState({ height: nextHeight });
    }
  }

  handleSearchRequest(query) {
    const { fetchSearchRequest, messages } = this.props;

    fetchSearchRequest(query);
    this.setState({ isNewSearch: false, messages });
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
    const { close, searchQuery, updateSearchQuery } = this.props;
    const { query } = this.state;

    if (searchQuery !== query) {
      updateSearchQuery(query);
    }

    close();
  }

  render() {
    const {
      users,
      messages,
      channelsMap,
      isLoading,
    } = this.props;

    const {
      query,
      results,
      updateSearchQuery,
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
            destroySearchQuery={updateSearchQuery}
            setQuery={this.setQuery}
            searchQuery={query}
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

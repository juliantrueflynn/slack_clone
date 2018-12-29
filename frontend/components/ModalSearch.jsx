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
      results: [],
      channelFilter: [],
      peopleFilter: [],
      height: 'inherit',
    };

    this.scrollBarRef = React.createRef();

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

  componentDidUpdate(prevProps) {
    const { messages, windowHeight, searchQuery } = this.props;
    const { height } = this.state;

    if (messages.length !== prevProps.messages.length) {
      this.setResults(messages);
    }

    if (messages.length || searchQuery) {
      if (height === 'inherit' || windowHeight !== prevProps.windowHeight) {
        const { top } = this.scrollBarRef.current.getBoundingClientRect();
        const bottomPadding = 8;
        this.updateHeight(windowHeight - top - bottomPadding);
      }
    } else {
      this.updateHeight('inherit');
    }
  }

  componentWillUnmount() {
    const { searchQuery, updateSearchQuery } = this.props;
    const { query } = this.state;

    if (searchQuery !== query) {
      updateSearchQuery(query);
    }
  }

  setQuery(query) {
    this.setState({ query });

    if (!query) {
      const { updateSearchQuery } = this.props;

      this.setResults([]);
      updateSearchQuery();
    }
  }

  setResults(results) {
    this.setState({ results });
  }

  updateHeight(nextHeight) {
    const { height } = this.state;

    if (height !== nextHeight) {
      this.setState({ height: nextHeight });
    }
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
      channelsMap,
      searchQuery,
      isLoading,
      fetchSearchRequest,
      updateSearchQuery,
      close,
    } = this.props;
    const {
      query,
      results,
      channelFilter,
      peopleFilter,
      height,
    } = this.state;

    const overlayClassName = classNames('ModalSearch', {
      'ModalSearch--empty': !peopleFilter.length && !channelFilter.length && !messages.length,
      'ModalSearch--loading': isLoading,
      'ModalSearch--new': !searchQuery,
    });

    return (
      <div className={overlayClassName}>
        <div className="ModalSearch__searchbar">
          <SearchBar
            searchSubmit={fetchSearchRequest}
            destroySearchQuery={updateSearchQuery}
            setQuery={this.setQuery}
            searchQuery={query}
          />
          <Button onClick={close} unStyled>
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

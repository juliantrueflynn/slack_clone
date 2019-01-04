import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import Button from './Button';
import ScrollBar from './ScrollBar';
import ModalSearchResults from './ModalSearchResults';
import ModalSearchSidebar from './ModalSearchSidebar';
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
    const { searchQuery: query, messages } = this.props;
    this.setState({ query });

    if (query && messages) {
      this.setResults(messages);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { messages, windowHeight, searchQuery } = this.props;
    const { height, channelFilter, peopleFilter } = this.state;

    const filters = [...channelFilter, ...peopleFilter];
    const prevFilters = [...prevState.channelFilter, ...prevState.peopleFilter];

    if (messages.length !== prevProps.messages.length || filters.length !== prevFilters.length) {
      this.setResults(messages);
    }

    if (messages.length || searchQuery) {
      if (height === 'inherit' || windowHeight !== prevProps.windowHeight) {
        const { top } = this.scrollBarRef.current.getBoundingClientRect();
        const bottomPadding = 8;
        this.setHeight(windowHeight - top - bottomPadding);
      }
    } else {
      this.setHeight('inherit');
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

  setHeight(nextHeight) {
    const { height } = this.state;

    if (height !== nextHeight) {
      this.setState({ height: nextHeight });
    }
  }

  setResults(messages) {
    const { channelFilter, peopleFilter } = this.state;

    const results = messages.filter(msg => (
      !channelFilter.length || channelFilter.includes(msg.channelSlug)
    )).filter(msg => (
      !peopleFilter.length || peopleFilter.includes(msg.authorSlug)
    ));

    this.setState({ results });
  }

  handleFilterToggle(e) {
    const slug = e.target.id;
    const type = e.target.getAttribute('data-filter');
    const { ...state } = this.state;
    const checkboxFilter = state[type];

    let newFilter;
    if (e.target.checked) {
      newFilter = [...checkboxFilter, slug];
    } else {
      newFilter = checkboxFilter.filter(entitySlug => entitySlug !== slug);
    }

    this.setState({ [type]: newFilter });
  }

  render() {
    const {
      usersMap,
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
      'ModalSearch--empty': !results.length && searchQuery,
      'ModalSearch--fw-loading': !results.length && isLoading,
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
          <ModalSearchResults results={results} channelsMap={channelsMap} />
          <ModalSearchSidebar
            isLoading={isLoading}
            messages={messages}
            channelsMap={channelsMap}
            usersMap={usersMap}
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

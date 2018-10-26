import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import Button from './Button';
import SearchModalResults from './SearchModalResults';
import SearchModalAside from './SearchModalAside';
import withModal from './withModal';
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

    const close = () => modalClose();
    const hasLen = !!results.length;

    const searchClassNames = classNames('SearchModal', {
      'SearchModal--fill': hasLen,
      'SearchModal--empty': !hasLen && !peopleFilter.length && !channelFilter.length,
      'SearchModal--loading': isSearchLoading,
    });

    return (
      <div className={searchClassNames}>
        <div className="SearchModal__searchbar">
          <SearchBar
            fetchSearchRequest={fetchSearchRequest}
            createSearch={createSearch}
            destroySearch={destroySearch}
            setQuery={this.setQuery}
            query={query}
          />
          <Button onClick={close} buttonFor="modal-close" unStyled>
            <FontAwesomeIcon icon="times" />
          </Button>
        </div>
        <div className="SearchModal__scroller">
          <div className="SearchModal__body">
            <div className="SearchModal__row">
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

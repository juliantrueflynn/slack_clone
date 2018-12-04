import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.handleInputVal = this.handleInputVal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }

  componentDidMount() {
    const { setQuery } = this.props;

    if (setQuery) {
      this.focus();
    }
  }

  focus() {
    this.input.current.focus();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { searchSubmit, query } = this.props;

    if (searchSubmit) {
      searchSubmit(query);
    }
  }

  handleInputVal(e) {
    const { setQuery } = this.props;
    setQuery(e.target.value);
  }

  handleClearClick() {
    const { setQuery, destroySearch } = this.props;

    destroySearch();

    if (setQuery) {
      setQuery('');
      this.focus();
    }
  }

  handleModalOpen(e) {
    e.preventDefault();

    const { openModal } = this.props;
    openModal('MODAL_SEARCH');
  }

  render() {
    const { query, hasClearIcon, openModal } = this.props;

    const isDisabled = !!openModal;

    const searchClassNames = classNames('SearchBar', {
      'SearchBar--disabled': openModal,
      'SearchBar--queried': query,
      'SearchBar--empty': !query,
    });

    return (
      <form className={searchClassNames} onSubmit={this.handleSubmit}>
        <div className="SearchBar__hoverable">
          <div className="SearchBar__disabled-overlay" role="presentation" onClick={this.handleModalOpen} />
          <Button type="submit" buttonFor="searchbar" unStyled disabled={isDisabled}>
            <FontAwesomeIcon icon="search" />
          </Button>
          <input
            type="text"
            ref={this.input}
            className="SearchBar__input"
            value={query}
            onChange={this.handleInputVal}
            placeholder="Search"
            disabled={isDisabled}
          />
        </div>
        {query && (
          <Button onClick={this.handleClearClick} buttonFor="clear" unStyled>
            {hasClearIcon || 'Clear'}
            {hasClearIcon && <span role="img" aria-label="Close drawer">&times;</span>}
          </Button>
        )}
      </form>
    );
  }
}

export default SearchBar;

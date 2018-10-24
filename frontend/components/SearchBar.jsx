import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputVal = this.handleInputVal.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  focus() {
    this.input.current.focus();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { fetchSearchRequest, query } = this.props;
    fetchSearchRequest(query);
  }

  handleInputVal(e) {
    const { setQuery } = this.props;
    setQuery(e.target.value);
  }

  handleClearClick() {
    const { setQuery, destroySearch } = this.props;

    destroySearch();
    setQuery('');
    this.focus();
  }

  render() {
    const { query } = this.props;

    return (
      <form className="SearchBar" onSubmit={this.handleSubmit}>
        <Button type="submit" buttonFor="searchbar" unStyled>
          <FontAwesomeIcon icon="search" />
        </Button>
        <input
          type="text"
          ref={this.input}
          className="SearchBar__input"
          value={query}
          onChange={this.handleInputVal}
          placeholder="Search"
        />
        <Button onClick={this.handleClearClick} buttonFor="clear" unStyled>
          Clear
        </Button>
      </form>
    );
  }
}

export default SearchBar;

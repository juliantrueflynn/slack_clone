import { connect } from 'react-redux';
import { updateSearchQuery, fetchSearch, updateModal } from '../actions/uiActions';
import SearchBar from '../components/SearchBar';

const mapStateToProps = state => ({
  savedQuery: state.search.searchQuery,
});

const mapDispatchToProps = dispatch => ({
  openSearchModal: () => dispatch(updateModal('MODAL_SEARCH')),
  fetchSearchRequest: searchQuery => dispatch(fetchSearch.request(searchQuery)),
  destroySearchQuery: () => dispatch(updateSearchQuery()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

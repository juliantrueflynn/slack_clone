import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserFavorites from './UserFavorites';
import { fetchFavorites } from '../actions/favoriteActions';

const mapStateToProps = state => ({
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  favorites: Object.values(state.entities.favorites),
});

const mapDispatchToProps = dispatch => ({
  fetchFavoritesRequest: workspaceSlug => dispatch(fetchFavorites.request(workspaceSlug)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserFavorites));

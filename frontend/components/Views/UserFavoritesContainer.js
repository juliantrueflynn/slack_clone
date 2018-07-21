import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserFavorites from './UserFavorites';
import { fetchFavorites } from '../../actions/favoriteActions';

const mapStateToProps = (state, { match }) => ({
  isChannelLoaded: state.ui.displayChannelSlug === match.params.channelSlug,
  favorites: Object.values(state.entities.favorites),
});

const mapDispatchToProps = dispatch => ({
  fetchFavoritesRequest: () => dispatch(fetchFavorites.request()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserFavorites));

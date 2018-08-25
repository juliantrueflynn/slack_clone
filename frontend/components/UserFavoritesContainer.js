import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserFavorites from './UserFavorites';
import { fetchFavorites } from '../actions/favoriteActions';
import { updateChannelSub } from '../actions/channelActions';

const mapStateToProps = (state, { match }) => ({
  isChannelLoaded: state.ui.displayChannelSlug === match.params.channelSlug,
  favorites: Object.values(state.entities.favorites),
  workspaceSlug: match.params.workspaceSlug,
});

const mapDispatchToProps = dispatch => ({
  fetchFavoritesRequest: workspaceSlug => dispatch(fetchFavorites.request(workspaceSlug)),
  updateChannelSubRequest: channelSub => dispatch(updateChannelSub.request(channelSub)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserFavorites));

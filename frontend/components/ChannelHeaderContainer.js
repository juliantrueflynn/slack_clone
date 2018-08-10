import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelHeader from './ChannelHeader';
import { rightSidebarClose } from '../actions/interactiveActions';

const mapStateToProps = (state, { match: { params } }) => {
  const channelUrl = `/${params.workspaceSlug}/${params.channelSlug}`;
  const isFavoritesOpen = state.ui.rightSidebar === 'Favorites';
  return {
    favoritesUrl: isFavoritesOpen ? channelUrl : `${channelUrl}/favorites`,
    isFavoritesOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  rightSidebarClose: () => dispatch(rightSidebarClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelRightSidebar from './ChannelRightSidebar';
import {
  closeRightSidebar,
  openRightSidebar
} from '../../actions/rightSidebarActions';
import { getThread, getUserFavorites } from '../../reducers/selectors';
import { navigate } from '../../actions/navigateActions';

const mapStateToProps = (state, { match }) => ({
  rightSidebar: state.ui.rightSidebar,
  isRightSidebarOpen: Boolean(state.ui.rightSidebar),
  messageSlug: match.params.messageSlug,
  threadEntries: getThread(state),
  message: state.entities.messages[match.params.messageSlug] || null,
  favorites: getUserFavorites(state)
});

const mapDispatchToProps = dispatch => ({
  openRightSidebar: (sidebarType, sidebarProps) => dispatch(
    openRightSidebar(sidebarType, sidebarProps)
  ),
  closeRightSidebar: () => dispatch(closeRightSidebar()),
  navigate: path => dispatch(navigate(path))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChannelRightSidebar)
);
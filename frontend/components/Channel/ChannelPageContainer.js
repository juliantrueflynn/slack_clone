import { connect } from 'react-redux';
import ChannelPage from './ChannelPage';
import { channelRequest } from '../../actions/channelActions';
import { getMessages } from '../../reducers/selectors';
import {
  openRightSidebar,
  closeRightSidebar
} from '../../actions/rightSidebarActions';
import { navigate } from '../../actions/navigateActions';

const mapStateToProps = (state, { match }) => ({
  messages: getMessages(state),
  workspaceSlug: match.params.workspaceSlug,
  channelSlug: match.params.channelSlug,
  messageSlug: match.params.messageSlug,
  rightSidebar: state.ui.rightSidebar
});

const mapDispatchToProps = dispatch => ({
  channelRequest: (channelSlug, ui) => dispatch(
    channelRequest(channelSlug, ui)
  ),
  openRightSidebar: () => dispatch(openRightSidebar('Favorites', {})),
  closeRightSidebar: () => dispatch(closeRightSidebar()),
  navigate: path => dispatch(navigate(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
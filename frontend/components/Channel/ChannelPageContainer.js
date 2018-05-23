import { connect } from 'react-redux';
import ChannelPage from './ChannelPage';
import { channelRequest } from '../../actions/channelActions';
import { getMessages } from '../../reducers/selectors';
import { openRightSidebar } from '../../actions/rightSidebarActions';

const mapStateToProps = (state, { match }) => ({
  messages: getMessages(state),
  workspaceSlug: match.params.workspaceSlug,
  channelSlug: match.params.channelSlug,
  messageSlug: match.params.messageSlug
});

const mapDispatchToProps = dispatch => ({
  channelRequest: (channelSlug, ui) => dispatch(
    channelRequest(channelSlug, ui)
  ),
  openRightSidebar: sidebarProps => dispatch(
    openRightSidebar('Favorites', sidebarProps)
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);
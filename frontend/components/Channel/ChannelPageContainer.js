import { connect } from 'react-redux';
import ChannelPage from './ChannelPage';
import { fetchChannel } from '../../actions/channelActions';
import { getMessages } from '../../reducers/selectors';

const mapStateToProps = (state, { match }) => ({
  messages: getMessages(state),
  workspaceSlug: match.params.workspaceSlug,
  channelSlug: match.params.channelSlug,
  messageSlug: match.params.messageSlug,
});

const mapDispatchToProps = dispatch => ({
  fetchChannelRequest: (channelSlug, ui) => dispatch(fetchChannel.request(channelSlug, ui)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);

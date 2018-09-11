import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelPage from './ChannelPage';
import { createChannelSub } from '../actions/channelActions';
import { updateRead } from '../actions/readActions';
import { isUserChatSub, selectWorkspaceIdBySlug } from '../reducers/selectors';

const mapStateToProps = (state, { match: { params } }) => ({
  workspaceId: selectWorkspaceIdBySlug(state, params.workspaceSlug),
  isChatSub: isUserChatSub(state),
});

const mapDispatchToProps = dispatch => ({
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
  updateReadRequest: read => dispatch(updateRead.request(read)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelPage));

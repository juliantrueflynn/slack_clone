import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelPage from './ChannelPage';
import { createChannelSub } from '../actions/channelActions';
import { isUserChatSub } from '../reducers/selectors';

const mapStateToProps = state => ({
  isChatSub: isUserChatSub(state),
});

const mapDispatchToProps = dispatch => ({
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelPage));

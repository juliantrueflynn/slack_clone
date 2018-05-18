import { connect } from 'react-redux';
import ChannelPage from './ChannelPage';
import { channelRequest } from '../../actions/channelActions';
import { getMessages } from '../../reducers/selectors';

const mapStateToProps = state => ({
  messages: getMessages(state),
});

const mapDispatchToProps = dispatch => ({
  channelRequest: (channelSlug, workspaceSlug, messageSlug) => dispatch(
    channelRequest(channelSlug, workspaceSlug, messageSlug)
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);
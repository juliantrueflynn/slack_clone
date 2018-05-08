import { connect } from 'react-redux';
import ChannelPage from './channel_page';
import { loadChannelPage } from '../../actions/channel_actions';
import { createMessage } from '../../util/message_api_util';
import { getMessages } from '../../reducers/selectors';
import { createMessageSuccess } from '../../actions/message_actions';
import { camelizeKeys } from 'humps';

const mapStateToProps = state => ({
  messages: getMessages(state),
});

const mapDispatchToProps = dispatch => ({
  loadChannelPage: (channelId, workspaceId) => dispatch(
    loadChannelPage(channelId, workspaceId)
  ),
  createMessageSuccess: message => dispatch(
    createMessageSuccess(camelizeKeys(message))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);
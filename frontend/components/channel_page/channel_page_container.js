import { connect } from 'react-redux';
import ChannelPage from './channel_page';
import { channelRequest } from '../../actions/channel_actions';
import { getMessages } from '../../reducers/selectors';
import {
  createMessageSuccess, editMessageSuccess, deleteMessageSuccess
} from '../../actions/message_actions';
import { camelizeKeys } from 'humps';

const mapStateToProps = state => ({
  messages: getMessages(state),
});

const mapDispatchToProps = dispatch => ({
  channelRequest: (channelSlug, workspaceSlug) => dispatch(
    channelRequest(channelSlug, workspaceSlug)
  ),
  onReceivedCallback: (type, message) => {
    const camelized = camelizeKeys(message);

    switch (type) {
      case "CREATE" :
        return dispatch(createMessageSuccess(camelized));
      case "EDIT" :
        return dispatch(editMessageSuccess(camelized));
      case "DELETE" :
        return dispatch(deleteMessageSuccess(camelized.slug));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);
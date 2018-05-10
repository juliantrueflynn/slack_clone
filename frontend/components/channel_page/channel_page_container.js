import { connect } from 'react-redux';
import ChannelPage from './channel_page';
import { loadChannelPage } from '../../actions/channel_actions';
import { getMessages } from '../../reducers/selectors';
import {
  createMessageSuccess, editMessageSuccess, deleteMessageSuccess
} from '../../actions/message_actions';
import { camelizeKeys } from 'humps';

const mapStateToProps = state => ({
  messages: getMessages(state),
});

const mapDispatchToProps = dispatch => ({
  loadChannelPage: (channelSlug, workspaceSlug) => dispatch(
    loadChannelPage(channelSlug, workspaceSlug)
  ),
  onReceivedCallback: (type, message) => {
    const camelized = camelizeKeys(message);

    switch (type) {
      case "CREATE" :
        return dispatch(createMessageSuccess(camelized));
      case "EDIT" :
        return dispatch(editMessageSuccess(camelized));
      case "DELETE" :
        return dispatch(deleteMessageSuccess(camelized.id));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);
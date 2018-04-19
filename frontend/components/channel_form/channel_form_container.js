import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';
import ChannelForm from './channel_form';

const mapStateToProps = state => ({
  currentUserId: state.session.currentUser.id,
  workspaceId: state.ui.displayWorkspaceId,
});

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
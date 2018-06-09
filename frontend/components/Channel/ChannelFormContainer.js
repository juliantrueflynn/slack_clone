import { connect } from 'react-redux';
import ChannelForm from './ChannelForm';
import { createChannelRequest } from '../../actions/channelActions';
import { modalClose } from '../../actions/modalActions';

const mapStateToProps = state => ({
  workspaceSlug: state.ui.displayWorkspaceSlug,
  isModalOpen: state.ui.displayModal === 'NEW_CHANNEL_MODAL',
});

const mapDispatchToProps = dispatch => ({
  createChannelRequest: channel => dispatch(createChannelRequest(channel)),
  modalClose: () => dispatch(modalClose('NEW_CHANNEL_MODAL')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);

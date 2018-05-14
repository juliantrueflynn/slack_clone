import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { createChannelRequest } from '../../actions/channel_actions';
import { CREATE_CHANNEL_MODAL, modalClose } from '../../actions/modal_actions';

const mapStateToProps = state => ({
  workspaceSlug: state.ui.displayWorkspaceSlug,
  isModalOpen: state.ui.displayModal === CREATE_CHANNEL_MODAL,
});

const mapDispatchToProps = dispatch => ({
  createChannelRequest: channel => dispatch(createChannelRequest(channel)),
  modalClose: () => dispatch(modalClose(CREATE_CHANNEL_MODAL))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';
import ChannelForm from './channel_form';
import { CREATE_CHANNEL_MODAL, modalClose } from '../../actions/modal_actions';
import { getCurrentWorkspaceId } from '../../reducers/selectors';

const mapStateToProps = state => ({
  ownerId: state.session.currentUser.id,
  workspaceId: getCurrentWorkspaceId(state),
  isModalOpen: state.ui.displayModal === CREATE_CHANNEL_MODAL,
});

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel)),
  modalClose: () => dispatch(modalClose(CREATE_CHANNEL_MODAL))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
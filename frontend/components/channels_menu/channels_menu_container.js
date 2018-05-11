import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelsMenu from './channels_menu';
import { requestChannels } from '../../actions/channel_actions';
import { getChannels, getPageWorkspaceSlug } from '../../reducers/selectors';
import { modalOpen, CREATE_CHANNEL_MODAL } from '../../actions/modal_actions';

const mapStateToProps = state => ({
  channels: getChannels(state),
  workspaceSlug: getPageWorkspaceSlug(state),
});

const mapDispatchToProps = dispatch => ({
  requestChannels: () => dispatch(requestChannels()),
  modalOpen: () => dispatch(modalOpen(CREATE_CHANNEL_MODAL)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsMenu));
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelsMenu from './ChannelsMenu';
import { channelsRequest } from '../../actions/channelActions';
import { getChannels, getPageWorkspaceSlug } from '../../reducers/selectors';
import { modalOpen, NEW_CHANNEL_MODAL } from '../../actions/modalActions';

const mapStateToProps = state => ({
  channels: getChannels(state),
  workspaceSlug: getPageWorkspaceSlug(state),
});

const mapDispatchToProps = dispatch => ({
  channelsRequest: () => dispatch(channelsRequest()),
  modalOpen: () => dispatch(modalOpen(NEW_CHANNEL_MODAL)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsMenu));
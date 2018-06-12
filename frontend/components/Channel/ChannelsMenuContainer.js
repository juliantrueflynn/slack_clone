import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelsMenu from './ChannelsMenu';
import { getChannels, getPageWorkspaceSlug } from '../../reducers/selectors';
import { modalOpen } from '../../actions/interactiveActions';

const mapStateToProps = state => ({
  channels: getChannels(state),
  workspaceSlug: getPageWorkspaceSlug(state),
});

const mapDispatchToProps = dispatch => ({
  modalOpen: () => dispatch(modalOpen('NEW_CHANNEL_MODAL')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelsMenu));


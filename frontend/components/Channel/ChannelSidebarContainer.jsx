import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelSidebar from './ChannelSidebar';
import { getWorkspaces } from '../../reducers/selectors';
import { modalOpen, modalClose } from '../../actions/modalActions';
import { openRightSidebar } from '../../actions/rightSidebarActions';

const mapStateToProps = (state, { match }) => ({
  workspaces: getWorkspaces(state),
  workspaceSlug: match.params.workspaceSlug,
  channelSlug: match.params.channelSlug,
  userSlug: state.session.currentUser ? state.session.currentUser.slug : null,
  isModalOpen: state.ui.displayModal === 'SETTINGS',
});

const mapDispatchToProps = dispatch => ({
  modalOpen: () => dispatch(modalOpen('SETTINGS')),
  modalClose: () => dispatch(modalClose()),
  openRightSidebar: () => dispatch(openRightSidebar('Workspace Directory', {})),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelSidebar));

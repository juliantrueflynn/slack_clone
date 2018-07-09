import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import { getWorkspaces } from '../reducers/selectors';
import { modalOpen, modalClose } from '../actions/interactiveActions';

const mapStateToProps = (state, { match }) => ({
  workspaces: getWorkspaces(state),
  workspaceSlug: match.params.workspaceSlug,
  channelSlug: state.ui.displayChannelSlug,
  userSlug: state.session.currentUser ? state.session.currentUser.slug : null,
  isModalOpen: state.ui.displayModal === 'SETTINGS',
});

const mapDispatchToProps = dispatch => ({
  modalOpen: () => dispatch(modalOpen('SETTINGS')),
  modalClose: () => dispatch(modalClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar));

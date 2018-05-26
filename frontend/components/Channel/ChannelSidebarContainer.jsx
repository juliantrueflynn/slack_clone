import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelSidebar from './ChannelSidebar';
import { getWorkspaces } from '../../reducers/selectors';
import { modalOpen, modalClose } from '../../actions/modalActions';

const mapStateToProps = (state, { match }) => ({
  workspaces: getWorkspaces(state),
  workspaceSlug: match.params.workspaceSlug
});

const mapDispatchToProps = dispatch => ({
  modalOpen: () => dispatch(modalOpen('SETTINGS')),
  modalClose: () => dispatch(modalClose())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChannelSidebar)
);
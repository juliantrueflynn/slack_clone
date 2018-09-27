import { connect } from 'react-redux';
import PublicWorkspaces from './PublicWorkspaces';
import { createWorkspaceSub, deleteWorkspaceSub } from '../actions/workspaceActions';
import { modalOpen } from '../actions/uiActions';

const mapDispatchToProps = dispatch => ({
  createWorkspaceSubRequest: workspaceSub => dispatch(createWorkspaceSub.request(workspaceSub)),
  deleteWorkspaceSubRequest: workspaceId => dispatch(deleteWorkspaceSub.request(workspaceId)),
  modalOpen: (modalType, modalProps) => dispatch(modalOpen(modalType, modalProps)),
});

export default connect(null, mapDispatchToProps)(PublicWorkspaces);

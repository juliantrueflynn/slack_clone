import { connect } from 'react-redux';
import PublicWorkspaces from './PublicWorkspaces';
import { createWorkspaceSub, updateWorkspaceSub } from '../actions/workspaceActions';
import { modalOpen } from '../actions/uiActions';

const mapDispatchToProps = dispatch => ({
  createWorkspaceSubRequest: workspaceSub => dispatch(createWorkspaceSub.request(workspaceSub)),
  updateWorkspaceSubRequest: workspaceSub => dispatch(updateWorkspaceSub.request(workspaceSub)),
  modalOpen: (modalType, modalProps) => dispatch(modalOpen(modalType, modalProps)),
});

export default connect(null, mapDispatchToProps)(PublicWorkspaces);

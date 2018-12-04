import { connect } from 'react-redux';
import PublicWorkspaces from './PublicWorkspaces';
import { createWorkspaceSub, updateWorkspaceSub } from '../actions/workspaceActions';
import { updateModal } from '../actions/uiActions';

const mapDispatchToProps = dispatch => ({
  createWorkspaceSubRequest: workspaceSub => dispatch(createWorkspaceSub.request(workspaceSub)),
  updateWorkspaceSubRequest: workspaceSub => dispatch(updateWorkspaceSub.request(workspaceSub)),
  openModal: (modalType, modalProps) => dispatch(updateModal(modalType, modalProps)),
});

export default connect(null, mapDispatchToProps)(PublicWorkspaces);

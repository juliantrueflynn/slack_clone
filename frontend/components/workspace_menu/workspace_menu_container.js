import { connect } from 'react-redux';
import WorkspaceMenu from './workspace_menu';
import { selectWorkspaces } from '../../reducers/selectors';
import {
  fetchWorkspaces,
  fetchWorkspace
} from '../../actions/workspace_actions';

const mapStateToProps = state => ({
  workspaces: selectWorkspaces(state),
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaces: () => dispatch(fetchWorkspaces()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceMenu);
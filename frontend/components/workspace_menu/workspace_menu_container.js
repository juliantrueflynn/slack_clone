import { connect } from 'react-redux';
import WorkspaceMenu from './workspace_menu';
import { getWorkspaces } from '../../reducers/selectors';
import {
  requestWorkspaces
} from '../../actions/workspace_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  workspaces: getWorkspaces(state),
});

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(requestWorkspaces()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceMenu));
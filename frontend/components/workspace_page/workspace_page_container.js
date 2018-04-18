import { connect } from 'react-redux';
import WorkspacePage from './workspace_page';
import {
  loadWorkspacePage, switchWorkspace
} from '../../actions/workspace_actions';
import { navigate } from '../../actions/navigate_actions';
import { getChannels } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  workspaceSlug: ownProps.match.workspaceSlug,
  workspaces: state.entities.workspaces,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadWorkspacePage: workspaceId => dispatch(loadWorkspacePage(workspaceId)),
  switchWorkspace: () => dispatch(switchWorkspace()),
  navigate: path => dispatch(navigate(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspacePage);
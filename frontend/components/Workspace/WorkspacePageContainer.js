import { connect } from 'react-redux';
import WorkspacePage from './WorkspacePage';
import { workspaceRequest } from '../../actions/workspaceActions';
import { navigate } from '../../actions/navigateActions';

const mapStateToProps = state => ({
  workspaceSlug: state.ui.displayWorkspaceSlug,
  defaultChannel: state.entities.channels && Object.values(state.entities.channels)[0]
});

const mapDispatchToProps = dispatch => ({
  workspaceRequest: workspaceSlug => dispatch(workspaceRequest(workspaceSlug))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspacePage);
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RightSidebar from './RightSidebar';
import { rightSidebarClose, rightSidebarOpen } from '../../actions/interactiveActions';

const mapStateToProps = (state, { match: { params } }) => ({
  rightSidebar: state.ui.rightSidebar,
  workspaceSlug: params.workspaceSlug,
  channelSlug: params.channelSlug,
});

const mapDispatchToProps = dispatch => ({
  rightSidebarOpen: sidebarType => dispatch(rightSidebarOpen(sidebarType)),
  rightSidebarClose: () => dispatch(rightSidebarClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RightSidebar));

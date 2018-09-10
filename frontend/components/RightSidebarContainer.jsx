import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RightSidebar from './RightSidebar';
import { rightSidebarClose, rightSidebarOpen } from '../actions/rightSidebarActions';
import { isRightSidebarOpen } from '../reducers/selectors';

const mapStateToProps = state => ({
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  isOpen: isRightSidebarOpen(state),
});

const mapDispatchToProps = dispatch => ({
  rightSidebarOpen: (sidebarType, sidebarProps) => (
    dispatch(rightSidebarOpen(sidebarType, sidebarProps))
  ),
  rightSidebarClose: () => dispatch(rightSidebarClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RightSidebar));

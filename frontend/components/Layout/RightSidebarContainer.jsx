import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RightSidebar from './RightSidebar';
import { rightSidebarClose, rightSidebarOpen } from '../../actions/interactiveActions';

const mapStateToProps = (state, { match: { params } }) => ({
  rightSidebar: state.ui.rightSidebar,
  channelUrl: `/${params.workspaceSlug}/${params.channelSlug}`,
});

const mapDispatchToProps = dispatch => ({
  rightSidebarOpen: (sidebarType, sidebarProps) => dispatch(rightSidebarOpen(
    sidebarType,
    sidebarProps
  )),
  rightSidebarClose: () => dispatch(rightSidebarClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RightSidebar));

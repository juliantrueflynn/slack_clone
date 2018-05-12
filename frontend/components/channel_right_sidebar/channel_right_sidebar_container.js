import { connect } from 'react-redux';
import ChannelRightSidebar from './channel_right_sidebar';
import { closeRightSidebar } from '../../actions/right_sidebar_actions';
import {
  getCurrentSidebarThread, getThread
} from '../../reducers/selectors';

const mapStateToProps = state => ({
  rightSidebar: state.ui.rightSidebar,
  isRightSidebarOpen: Boolean(state.ui.rightSidebar),
  threadEntries: getThread(state),
  message: getCurrentSidebarThread(state),
});

const mapDispatchToProps = dispatch => ({
  closeRightSidebar: () => dispatch(closeRightSidebar()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelRightSidebar);
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelRightSidebar from './ChannelRightSidebar';
import {
  closeRightSidebar,
  openRightSidebar
} from '../../actions/rightSidebarActions';
import { getThread } from '../../reducers/selectors';

const mapStateToProps = (state, { match }) => ({
  rightSidebar: state.ui.rightSidebar,
  isRightSidebarOpen: Boolean(state.ui.rightSidebar),
  messageSlug: match.params.messageSlug,
  threadEntries: getThread(state),
  message: state.entities.messages[match.params.messageSlug] || null
});

const mapDispatchToProps = dispatch => ({
  openRightSidebar: sidebarProps => {
    const defaults = Object.assign({ title: 'Thread' }, sidebarProps);
    return dispatch(openRightSidebar('Thread', defaults));
  },
  closeRightSidebar: () => dispatch(closeRightSidebar()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChannelRightSidebar)
);
import { connect } from 'react-redux';
import MessagePage from './MessagePage';
import { openRightSidebar } from '../../actions/rightSidebarActions';

const mapStateToProps = (state, { match: { params } }) => ({
  messageSlug: params.messageSlug,
  channelSlug: params.channelSlug,
  workspaceSlug: params.workspaceSlug,
  message: state.entities.messages[params.messageSlug]
});

const mapDispatchToProps = dispatch => ({
  openRightSidebar: sidebarProps => {
    const defaults = Object.assign({ title: 'Thread' }, sidebarProps);
    return dispatch(openRightSidebar('Thread', defaults));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage);
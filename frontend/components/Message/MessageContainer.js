import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import {
  updateMessageRequest,
  deleteMessageRequest
} from '../../actions/messageActions';
import { openRightSidebar } from '../../actions/rightSidebarActions';

const mapStateToProps = (state, { message, match }) => ({
  isUserAuthor: () => {
    const currentUser = state.session.currentUser;
    return currentUser && currentUser.slug === message.authorSlug;
  },
  workspaceSlug: match.params.workspaceSlug
});

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessageRequest(message)),
  deleteMessageRequest: messageSlug => dispatch(
    deleteMessageRequest(messageSlug)
  ),
  openRightSidebar: sidebarProps => dispatch(
    openRightSidebar('Thread', sidebarProps)
  )
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Message)
);
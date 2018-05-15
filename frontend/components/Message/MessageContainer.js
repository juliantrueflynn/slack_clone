import { connect } from 'react-redux';
import Message from './Message';
import {
  updateMessageRequest,
  deleteMessageRequest
} from '../../actions/messageActions';
import { openRightSidebar } from '../../actions/rightSidebarActions';

const mapStateToProps = ({ session }, { message }) => ({
  isUserAuthor: session.currentUser.slug === message.authorSlug
});

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessageRequest(message)),
  deleteMessageRequest: messageSlug => dispatch(
    deleteMessageRequest(messageSlug)
  ),
  openRightSidebar: (sidebarProps) => {
    const defaults = Object.assign({ title: 'Thread' }, sidebarProps);
    return dispatch(openRightSidebar('THREAD', defaults));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
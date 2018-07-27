import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageThread from './MessageThread';
import { selectThreadFromSlug, selectAuthors } from '../../reducers/selectors';
import { readUpdate } from '../../actions/readActions';
import { fetchMessage } from '../../actions/messageActions';

const mapStateToProps = (state, { match: { params } }) => ({
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  threadMessages: selectThreadFromSlug(state),
  message: state.entities.messages[params.messageSlug],
  messageSlug: params.messageSlug,
  authors: selectAuthors(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMessageRequest: messageSlug => dispatch(fetchMessage.request(messageSlug)),
  readUpdateRequest: readableId => dispatch(readUpdate.request(readableId, 'Message')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageThread));

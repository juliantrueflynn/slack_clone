import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageThread from './MessageThread';
import { openRightSidebar } from '../../actions/sidebarActions';
import { getThread, getUserFavorites } from '../../reducers/selectors';

const mapStateToProps = (state, { match }) => ({
  threadEntries: getThread(state),
  message: state.entities.messages[match.params.messageSlug] || null,
  favorites: getUserFavorites(state),
});

const mapDispatchToProps = dispatch => ({
  openRightSidebar: sidebarProps => dispatch(openRightSidebar('Thread', sidebarProps)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageThread));

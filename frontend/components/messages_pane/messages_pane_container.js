import { connect } from 'react-redux';
import MessagesPane from './messages_pane';
import { loadMessages } from '../../actions/message_actions';
import { getMessages } from '../../reducers/selectors';

const mapStateToProps = state => ({
  messages: getMessages(state),
});

const mapDispatchToProps = dispatch => ({
  loadMessages: () => dispatch(loadMessages())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesPane);
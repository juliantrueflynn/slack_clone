import { connect } from 'react-redux';
import MessagesPane from './messages_pane';
import { getMessages } from '../../reducers/selectors';

const mapStateToProps = state => ({
  messages: getMessages(state),
});

export default connect(
  mapStateToProps,
  null
)(MessagesPane);
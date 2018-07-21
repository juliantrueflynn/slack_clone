import { connect } from 'react-redux';
import DirectMessagePage from './DirectMessagePage';

const mapStateToDispatch = state => ({
  authors: state.entites.members,
});

export default connect(mapStateToDispatch, null)(DirectMessagePage);

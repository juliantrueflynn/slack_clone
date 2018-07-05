import { connect } from 'react-redux';
import { camelizeKeys } from 'humps';
import ActionCables from './ActionCables';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  actionCableReceive: actionFromActionCable => dispatch(camelizeKeys(actionFromActionCable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionCables);

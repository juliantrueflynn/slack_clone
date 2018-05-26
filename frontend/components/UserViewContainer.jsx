import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserView from './UserView';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserView)
);
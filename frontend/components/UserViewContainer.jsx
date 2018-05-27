import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserView from './UserView';
import { openRightSidebar } from '../actions/rightSidebarActions';

const mapStateToProps = (state, { match }) => ({
  user: state.entities.members[match.params.userSlug]
});

const mapDispatchToProps = dispatch => ({
  openRightSidebar: sidebarProps => dispatch(
    openRightSidebar('Workspace Directory', sidebarProps)
  )
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserView)
);
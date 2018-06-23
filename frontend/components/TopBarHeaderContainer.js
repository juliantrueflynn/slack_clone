import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openRightSidebar, closeRightSidebar, navigate } from '../actions/interactiveActions';
import TopBarHeader from './TopBarHeader';

const mapStateToProps = state => ({
  rightSidebar: state.ui.rightSidebar,
});

const mapDispatchToProps = dispatch => ({
  openRightSidebar: () => dispatch(openRightSidebar('Favorites', {})),
  closeRightSidebar: () => dispatch(closeRightSidebar()),
  navigate: path => dispatch(navigate({ path, push: true })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBarHeader));

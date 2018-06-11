import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserFavorites from './UserFavorites';
import { openRightSidebar } from '../../actions/sidebarActions';
import { getUserFavorites } from '../../reducers/selectors';

const mapStateToProps = state => ({
  favorites: getUserFavorites(state),
});

const mapDispatchToProps = dispatch => ({
  openRightSidebar: () => dispatch(openRightSidebar('Favorites', {})),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserFavorites));

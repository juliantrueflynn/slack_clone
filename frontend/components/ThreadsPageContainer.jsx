import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ThreadsPage from './ThreadsPage';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThreadsPage));

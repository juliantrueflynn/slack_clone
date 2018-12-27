import { connect } from 'react-redux';
import Form from './Form';
import { updateFormSuccess, destroyFormErrors } from '../actions/uiActions';

const mapStateToProps = state => ({
  formSuccess: state.success,
  formErrors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  destroyFormSuccess: () => dispatch(updateFormSuccess()),
  destroyFormErrors: () => dispatch(destroyFormErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

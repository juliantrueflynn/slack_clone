import { connect } from 'react-redux';
import Form from './Form';
import { updateFormSuccess, destroyFormErrors } from '../actions/uiActions';

const mapStateToProps = state => ({
  formSuccess: state.success,
  formErrors: state.errors,
  isSubmitting: state.isLoading.form,
});

const mapDispatchToProps = dispatch => ({
  destroyFormSuccess: () => dispatch(updateFormSuccess()),
  destroyFormErrors: () => dispatch(destroyFormErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

import { connect } from 'react-redux';
import Form from './Form';
import { updateFormSuccess } from '../actions/uiActions';

const mapStateToProps = (state, { formFor }) => ({
  formSuccess: state.success,
  formErrors: state.errors[formFor],
});

const mapDispatchToProps = dispatch => ({
  destroyFormSuccess: () => dispatch(updateFormSuccess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

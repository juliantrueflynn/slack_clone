import { connect } from 'react-redux';
import Form from './Form';

const mapStateToProps = (state, { formFor }) => ({
  formSuccess: state.success[formFor],
  formErrors: state.errors[formFor],
});

export default connect(mapStateToProps, null)(Form);

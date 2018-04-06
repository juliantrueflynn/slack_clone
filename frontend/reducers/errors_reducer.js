import sessionErrorsReducer from './session_errors_reducer';
import { combineReducers } from 'redux';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
});

export default errorsReducer;
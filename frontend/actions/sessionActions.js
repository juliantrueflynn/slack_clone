import { SIGN_IN, SIGN_UP, SIGN_OUT } from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const signIn = {
  request: currentUser => actionCreator(SIGN_IN.REQUEST, { currentUser }),
  receive: currentUser => actionCreator(SIGN_IN.RECEIVE, { currentUser }),
  failure: errors => actionCreator(SIGN_IN.FAILURE, errors),
};

export const signUp = {
  request: currentUser => actionCreator(SIGN_UP.REQUEST, { currentUser }),
  receive: currentUser => actionCreator(SIGN_UP.RECEIVE, { currentUser }),
  failure: errors => actionCreator(SIGN_UP.FAILURE, errors),
};

export const signOut = {
  request: () => actionCreator(SIGN_OUT.REQUEST),
  receive: () => actionCreator(SIGN_OUT.RECEIVE),
  failure: errors => actionCreator(SIGN_OUT.FAILURE, errors),
};

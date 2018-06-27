import { actionCreator } from '../util/actionsUtil';
import { MESSAGE, THREAD_MESSAGE } from './actionTypes';

export const fetchMessage = {
  request: messageSlug => actionCreator(MESSAGE.SHOW.REQUEST, { messageSlug }),
  receive: message => actionCreator(MESSAGE.SHOW.RECEIVE, { message }),
  failure: errors => actionCreator(MESSAGE.SHOW.FAILURE, { errors }),
};

export const createMessage = {
  request: message => actionCreator(MESSAGE.CREATE.REQUEST, { message }),
  failure: errors => actionCreator(MESSAGE.CREATE.FAILURE, { errors }),
};

export const updateMessage = {
  request: message => actionCreator(MESSAGE.UPDATE.REQUEST, { message }),
  failure: errors => actionCreator(MESSAGE.UPDATE.FAILURE, { errors }),
};

export const deleteMessage = {
  request: messageSlug => actionCreator(MESSAGE.DELETE.REQUEST, { messageSlug }),
  failure: errors => actionCreator(MESSAGE.DELETE.FAILURE, { errors }),
};

export const createThreadMessage = {
  request: (message, parentMessageSlug) => (
    actionCreator(THREAD_MESSAGE.CREATE.REQUEST, { message, parentMessageSlug })
  ),
  failure: errors => actionCreator(THREAD_MESSAGE.CREATE.FAILURE, { errors }),
};

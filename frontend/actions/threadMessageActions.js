import { THREAD_MESSAGE } from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const fetchThreadMessages = {
  request: messageSlug => actionCreator(THREAD_MESSAGE.INDEX.REQUEST, { messageSlug }),
  receive: threadMessages => actionCreator(THREAD_MESSAGE.INDEX.RECEIVE, { threadMessages }),
  failure: errors => actionCreator(THREAD_MESSAGE.INDEX.FAILURE, { errors }),
};

export const fetchThreadMessage = {
  request: messageSlug => actionCreator(THREAD_MESSAGE.SHOW.REQUEST, { messageSlug }),
  receive: threadMessage => actionCreator(THREAD_MESSAGE.SHOW.RECEIVE, { threadMessage }),
  failure: errors => actionCreator(THREAD_MESSAGE.SHOW.FAILURE, { errors }),
};

export const createThreadMessage = {
  request: threadMessage => actionCreator(THREAD_MESSAGE.CREATE.REQUEST, { threadMessage }),
  receive: threadMessage => actionCreator(THREAD_MESSAGE.CREATE.RECEIVE, { threadMessage }),
  failure: errors => actionCreator(THREAD_MESSAGE.CREATE.FAILURE, { errors }),
};

export const updateThreadMessage = {
  request: threadMessage => actionCreator(THREAD_MESSAGE.UPDATE.REQUEST, { threadMessage }),
  receive: threadMessage => actionCreator(THREAD_MESSAGE.UPDATE.RECEIVE, { threadMessage }),
  failure: errors => actionCreator(THREAD_MESSAGE.UPDATE.FAILURE, { errors }),
};

export const deleteThreadMessage = {
  request: threadMessage => actionCreator(THREAD_MESSAGE.DELETE.REQUEST, { threadMessage }),
  receive: threadMessage => actionCreator(THREAD_MESSAGE.DELETE.RECEIVE, { threadMessage }),
  failure: errors => actionCreator(THREAD_MESSAGE.DELETE.FAILURE, { errors }),
};

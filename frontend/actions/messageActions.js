import { actionCreator } from '../util/actionsUtil';
import { MESSAGE } from './actionTypes';

export const fetchMessage = {
  request: workspaceSlug => actionCreator(MESSAGE.SHOW.REQUEST, { workspaceSlug }),
  receive: workspaces => actionCreator(MESSAGE.SHOW.RECEIVE, { workspaces }),
  failure: errors => actionCreator(MESSAGE.SHOW.FAILURE, { errors }),
};

export const createMessage = {
  request: message => actionCreator(MESSAGE.CREATE.REQUEST, { message }),
  receive: (message, parentMessageSlug) => actionCreator(MESSAGE.CREATE.RECEIVE, {
    message,
    parentMessageSlug,
  }),
  failure: errors => actionCreator(MESSAGE.CREATE.FAILURE, { errors }),
};

export const updateMessage = {
  request: message => actionCreator(MESSAGE.UPDATE.REQUEST, { message }),
  receive: message => actionCreator(MESSAGE.UPDATE.RECEIVE, { message }),
  failure: errors => actionCreator(MESSAGE.UPDATE.FAILURE, { errors }),
};

export const deleteMessage = {
  request: messageSlug => actionCreator(MESSAGE.DELETE.REQUEST, { messageSlug }),
  receive: message => actionCreator(MESSAGE.DELETE.RECEIVE, { message }),
  failure: errors => actionCreator(MESSAGE.DELETE.FAILURE, { errors }),
};

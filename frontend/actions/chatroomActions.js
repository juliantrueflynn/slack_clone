import { actionCreator } from '../util/actionsUtil';
import { CHATROOM, CHATROOM_SUB } from './actionTypes';

export const fetchChatrooms = {
  request: workspaceSlug => actionCreator(CHATROOM.INDEX.REQUEST, { workspaceSlug }),
  receive: chatrooms => actionCreator(CHATROOM.INDEX.RECEIVE, { chatrooms }),
  failure: errors => actionCreator(CHATROOM.INDEX.FAILURE, { errors }),
};

export const fetchChatroom = {
  request: chatroomSlug => actionCreator(CHATROOM.SHOW.REQUEST, { chatroomSlug }),
  receive: messages => actionCreator(CHATROOM.SHOW.RECEIVE, { messages }),
  failure: errors => actionCreator(CHATROOM.SHOW.FAILURE, { errors }),
};

export const createChatroom = {
  request: chatroom => actionCreator(CHATROOM.CREATE.REQUEST, { chatroom }),
  failure: errors => actionCreator(CHATROOM.CREATE.FAILURE, { errors }),
};

export const updateChatroom = {
  request: chatroom => actionCreator(CHATROOM.UPDATE.REQUEST, { chatroom }),
  failure: errors => actionCreator(CHATROOM.UPDATE.FAILURE, { errors }),
};

export const createChatroomSub = {
  request: chatroomSub => actionCreator(CHATROOM_SUB.CREATE.REQUEST, { chatroomSub }),
  failure: errors => actionCreator(CHATROOM_SUB.CREATE.FAILURE, { errors }),
};

export const updateChatroomSub = {
  request: chatroomSlug => actionCreator(CHATROOM_SUB.UPDATE.REQUEST, { chatroomSlug }),
  receive: chatroomSub => actionCreator(CHATROOM_SUB.UPDATE.RECEIVE, { chatroomSub }),
  failure: errors => actionCreator(CHATROOM_SUB.UPDATE.FAILURE, { errors }),
};

export const destroyChatroomSub = {
  request: chatroomSlug => actionCreator(CHATROOM_SUB.DESTROY.REQUEST, { chatroomSlug }),
  failure: errors => actionCreator(CHATROOM_SUB.DESTROY.FAILURE, { errors }),
};

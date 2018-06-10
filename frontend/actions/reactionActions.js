import { actionCreator } from '../util/actionsUtil';
import { REACTION } from './actionTypes';

export const createReaction = {
  request: reaction => actionCreator(REACTION.CREATE.REQUEST, { reaction }),
  receive: reaction => actionCreator(REACTION.CREATE.RECEIVE, { reaction }),
  failure: errors => actionCreator(REACTION.CREATE.FAILURE, { errors }),
};

export const deleteReaction = {
  request: reactionId => actionCreator(REACTION.SHOW.REQUEST, { reactionId }),
  receive: reaction => actionCreator(REACTION.SHOW.RECEIVE, { reaction }),
  failure: errors => actionCreator(REACTION.SHOW.FAILURE, { errors }),
};

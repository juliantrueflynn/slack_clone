import { actionCreator } from '../util/actionsUtil';
import { REACTION } from './actionTypes';

export const createReaction = {
  request: reaction => actionCreator(REACTION.CREATE.REQUEST, { reaction }),
  failure: errors => actionCreator(REACTION.CREATE.FAILURE, { errors }),
};

export const deleteReaction = {
  request: reactionId => actionCreator(REACTION.SHOW.REQUEST, { reactionId }),
  failure: errors => actionCreator(REACTION.SHOW.FAILURE, { errors }),
};

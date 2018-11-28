import { actionCreator } from '../util/actionsUtil';
import { REACTION, REACTION_TOGGLE } from './actionTypes';

export const createReaction = {
  request: reaction => actionCreator(REACTION.CREATE.REQUEST, { reaction }),
  failure: errors => actionCreator(REACTION.CREATE.FAILURE, { errors }),
};

export const destroyReaction = {
  request: id => actionCreator(REACTION.DESTROY.REQUEST, { id }),
  failure: errors => actionCreator(REACTION.DESTROY.FAILURE, { errors }),
};

export const toggleReaction = reaction => actionCreator(REACTION_TOGGLE, { reaction });

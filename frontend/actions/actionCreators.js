import * as types from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const fetchWorkspaces = {
  request: () => actionCreator(types.WORKSPACE.INDEX.REQUEST),
  receive: workspaces => actionCreator(types.WORKSPACE.INDEX.RECEIVE, { workspaces }),
  failure: errors => actionCreator(types.WORKSPACE.INDEX.FAILURE, { errors }),
};

export const fetchChannels = {
  request: () => actionCreator(types.CHANNEL.INDEX.REQUEST),
  receive: channels => actionCreator(types.CHANNEL.INDEX.RECEIVE, { channels }),
  failure: errors => actionCreator(types.CHANNEL.INDEX.FAILURE, { errors }),
};

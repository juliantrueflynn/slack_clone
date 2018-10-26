import { SEARCH, SEARCH_DESTROY } from './actionTypes';
import { actionCreator } from '../util/actionsUtil';

export const fetchSearch = {
  request: query => actionCreator(SEARCH.INDEX.REQUEST, { query }),
  receive: messages => actionCreator(SEARCH.INDEX.RECEIVE, { messages }),
  failure: errors => actionCreator(SEARCH.INDEX.FAILURE, { errors }),
};

export const destroySearch = () => ({
  type: SEARCH_DESTROY
});

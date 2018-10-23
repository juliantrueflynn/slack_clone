import * as saga from 'redux-saga/effects';
import { SEARCH } from '../actions/actionTypes';
import { fetchSearch } from '../actions/uiActions';
import { apiFetch } from '../util/apiUtil';
import { selectUIByDisplay } from '../reducers/selectors';

function* loadSearchResults({ query }) {
  try {
    const workspaceSlug = yield saga.select(selectUIByDisplay, 'displayWorkspaceSlug');
    const apiUrl = `workspaces/${workspaceSlug}/search/${query}`;
    const messageThreads = yield saga.call(apiFetch, apiUrl);
    yield saga.put(fetchSearch.receive(messageThreads));
  } catch (error) {
    yield saga.put(fetchSearch.failure(error));
  }
}

export default function* searchSaga() {
  yield saga.takeLatest(SEARCH.INDEX.REQUEST, loadSearchResults);
}

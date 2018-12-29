import {
  takeLatest,
  select,
  call,
  put,
} from 'redux-saga/effects';
import { SEARCH } from '../actions/actionTypes';
import { fetchSearch } from '../actions/uiActions';
import { apiFetch } from '../util/apiUtil';
import { selectUIByDisplay } from '../reducers/selectors';

function* loadSearchResults({ searchQuery }) {
  try {
    const workspaceSlug = yield select(selectUIByDisplay, 'displayWorkspaceSlug');
    const apiUrl = `workspaces/${workspaceSlug}/search/${searchQuery}`;
    const messageThreads = yield call(apiFetch, apiUrl);

    yield put(fetchSearch.receive(messageThreads));
  } catch (error) {
    yield put(fetchSearch.failure(error));
  }
}

export default function* searchSaga() {
  yield takeLatest(SEARCH.INDEX.REQUEST, loadSearchResults);
}

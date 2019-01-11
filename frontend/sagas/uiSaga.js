import {
  all,
  fork,
  put,
  takeLatest,
  select,
  call,
} from 'redux-saga/effects';
import { DRAWER_UPDATE, NAVIGATE, SEARCH } from '../actions/actionTypes';
import history from '../util/history';
import { apiFetch } from '../util/apiUtil';
import { fetchMessage } from '../actions/messageActions';
import { fetchUser } from '../actions/userActions';
import { fetchFavorites } from '../actions/favoriteActions';
import { fetchChannel } from '../actions/channelActions';
import { fetchSearch } from '../actions/uiActions';
import { selectUIByDisplay } from '../reducers/selectors';

function* navigateTo({ pathname }) {
  yield history.push(pathname);
}

function* fetchDrawerEntities({ drawerType, drawerSlug }) {
  let entitySlug = drawerSlug;
  let fetchActionFunc;

  switch (drawerType) {
    case 'convo':
      fetchActionFunc = fetchMessage;
      break;
    case 'team':
      fetchActionFunc = fetchUser;
      break;
    case 'favorites': {
      const workspaceSlug = yield select(selectUIByDisplay, 'displayWorkspaceSlug');
      entitySlug = workspaceSlug;
      fetchActionFunc = fetchFavorites;
      break;
    }
    case 'details': {
      const chatPath = yield select(selectUIByDisplay, 'displayChatPath');

      if (chatPath === 'unreads' || chatPath === 'threads') {
        return;
      }

      entitySlug = chatPath;
      fetchActionFunc = fetchChannel;
      break;
    }
    default:
      return;
  }

  yield put(fetchActionFunc.request(entitySlug));
}

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

function* watchNavigate() {
  yield takeLatest(NAVIGATE, navigateTo);
}

function* watchDrawerUpdate() {
  yield takeLatest(DRAWER_UPDATE, fetchDrawerEntities);
}

function* watchSearchQuery() {
  yield takeLatest(SEARCH.INDEX.REQUEST, loadSearchResults);
}

export default function* uiSaga() {
  yield all([
    fork(watchNavigate),
    fork(watchDrawerUpdate),
    fork(watchSearchQuery),
  ]);
}
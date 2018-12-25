import { put, takeLatest, select } from 'redux-saga/effects';
import { DRAWER_UPDATE } from '../actions/actionTypes';
import { fetchMessage } from '../actions/messageActions';
import { fetchUser } from '../actions/userActions';
import { fetchFavorites } from '../actions/favoriteActions';
import { selectUIByDisplay } from '../reducers/selectors';
import { fetchChannel } from '../actions/channelActions';

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

export default function* drawerSaga() {
  yield takeLatest(DRAWER_UPDATE, fetchDrawerEntities);
}

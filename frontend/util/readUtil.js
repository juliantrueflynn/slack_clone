import { select } from 'redux-saga/effects';
import { selectEntityBySlug, selectUIByDisplay, getCurrentUser } from '../reducers/selectors';

export const getReadProps = msg => ({
  slug: msg.parentMessageSlug || msg.channelSlug,
  readableType: msg.parentMessageSlug ? 'Message' : 'Channel',
  readableId: msg.parentMessageId || msg.channelId,
});

export function* getUnread(props) {
  const unread = yield select(selectEntityBySlug, 'unreads', props.slug);

  return {
    lastRead: unread && unread.lastRead,
    ...props,
    ...unread,
  };
}

export function* isCurrentUserNotInConvo({ message, parentMessage }) {
  const parent = parentMessage || {};
  const currUser = yield select(getCurrentUser);

  if (message.authorSlug === currUser.slug || parent.authorSlug === currUser.slug) {
    return false;
  }

  const read = yield select(selectEntityBySlug, 'unreads', parent.slug);

  return !read;
}

export function* isCurrentUserInView({ slug, readableType }) {
  const chatPath = yield select(selectUIByDisplay, 'displayChatPath');

  if (readableType === 'Channel') {
    return chatPath === slug;
  }

  if (chatPath === 'threads') {
    return true;
  }

  const drawer = yield select(selectUIByDisplay, 'drawer');

  return drawer.drawerType === 'convo' && drawer.drawerSlug === slug;
}

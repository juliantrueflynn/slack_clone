import { select } from 'redux-saga/effects';
import { selectEntityBySlug, selectUIByDisplay, getCurrentUser } from '../reducers/selectors';

export const getReadProps = msg => ({
  slug: msg.parentMessageSlug || msg.chatroomSlug,
  readableType: msg.parentMessageSlug ? 'Message' : 'Chatroom',
  readableId: msg.parentMessageId || msg.chatroomId,
});

export function* getUnread(props) {
  const unread = yield select(selectEntityBySlug, 'unreads', props.slug);

  return {
    lastRead: unread && unread.lastRead,
    ...props,
    ...unread,
  };
}

export function* isCurrentUserNotInConvo(authors) {
  const currUser = yield select(getCurrentUser);

  return authors && authors.every(authorSlug => authorSlug !== currUser.slug);
}

export function* isCurrentUserInView({ slug, readableType }) {
  const chatroomSlug = yield select(selectUIByDisplay, 'displayChatroomSlug');

  if (readableType === 'Chatroom') {
    return chatroomSlug === slug;
  }

  if (chatroomSlug === 'threads') {
    return true;
  }

  const drawer = yield select(selectUIByDisplay, 'drawer');

  return drawer.drawerType === 'convo' && drawer.drawerSlug === slug;
}

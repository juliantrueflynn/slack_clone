export const OPEN_THREAD = 'OPEN_THREAD';
export const CLOSE_THREAD = 'CLOSE_THREAD';

export const openThread = messageSlug => ({
  type: OPEN_THREAD,
  messageSlug
});

export const closeThread = () => ({
  type: CLOSE_THREAD
});
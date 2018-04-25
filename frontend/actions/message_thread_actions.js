export const OPEN_THREAD = 'OPEN_THREAD';
export const CLOSE_THREAD = 'CLOSE_THREAD';

export const openThread = messageId => ({
  type: OPEN_THREAD,
  messageId
});

export const closeThread = () => ({
  type: CLOSE_THREAD
});
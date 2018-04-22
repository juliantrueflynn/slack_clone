export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const FAILURE_MESSAGES = 'FAILURE_MESSAGES';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const REQUEST_MESSAGE = 'REQUEST_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const FAILURE_MESSAGE = 'FAILURE_MESSAGE';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';
export const CREATE_MESSAGE_ERRORS = 'CREATE_MESSAGE_ERRORS';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';
export const OPEN_EDIT_MESSAGE = 'OPEN_EDIT_MESSAGE';
export const CLOSE_EDIT_MESSAGE = 'CLOSE_EDIT_MESSAGE';
export const EDIT_MESSAGE_SUCCESS = 'EDIT_MESSAGE_SUCCESS';

export const requestMessages = (messages = {}) => ({
  type: REQUEST_MESSAGES,
  messages
});

export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const failureMessages = errors => ({
  type: FAILURE_MESSAGES,
  errors
});

export const loadMessages = channelId => ({
  type: LOAD_MESSAGES,
  channelId
});

export const requestMessage = messageId => ({
  type: REQUEST_MESSAGE,
  messageId
});

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const failureMessage = errors => ({
  type: FAILURE_MESSAGE,
  errors
});

export const createMessage = message => ({
  type: CREATE_MESSAGE,
  message
});

export const createMessageSuccess = message => ({
  type: CREATE_MESSAGE_SUCCESS,
  message
});

export const createMessageErrors = errors => ({
  type: CREATE_MESSAGE_ERRORS,
  errors
});

export const deleteMessage = messageId => ({
  type: DELETE_MESSAGE,
  messageId
});

export const deleteMessageSuccess = messageId => ({
  type: DELETE_MESSAGE_SUCCESS,
  messageId
});

export const editMessage = message => ({
  type: EDIT_MESSAGE,
  message
});

export const openEditMessage = message => ({
  type: OPEN_EDIT_MESSAGE,
  message
});

export const closeEditMessage = () => ({
  type: CLOSE_EDIT_MESSAGE,
});

export const editMessageSuccess = message => ({
  type: EDIT_MESSAGE_SUCCESS,
  message
});
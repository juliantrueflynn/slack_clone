export const CREATE_MESSAGE_REQUEST = 'CREATE_MESSAGE_REQUEST';
export const CREATE_MESSAGE_RECEIVE = 'CREATE_MESSAGE_RECEIVE';
export const CREATE_MESSAGE_FAILURE = 'CREATE_MESSAGE_FAILURE';
export const UPDATE_MESSAGE_REQUEST = 'UPDATE_MESSAGE_REQUEST';
export const UPDATE_MESSAGE_RECEIVE = 'UPDATE_MESSAGE_RECEIVE';
export const UPDATE_MESSAGE_FAILURE = 'UPDATE_MESSAGE_FAILURE';
export const DELETE_MESSAGE_REQUEST = 'DELETE_MESSAGE_REQUEST';
export const DELETE_MESSAGE_RECEIVE = 'DELETE_MESSAGE_RECEIVE';
export const DELETE_MESSAGE_FAILURE = 'DELETE_MESSAGE_FAILURE';

export const createMessageRequest = message => ({
  type: CREATE_MESSAGE_REQUEST,
  message
});

export const createMessageReceive = (message, parentMessageSlug = null) => ({
  type: CREATE_MESSAGE_RECEIVE,
  message,
  parentMessageSlug
});

export const createMessageFailure = errors => ({
  type: CREATE_MESSAGE_FAILURE,
  errors
});

export const updateMessageRequest = message => ({
  type: UPDATE_MESSAGE_REQUEST,
  message
});

export const updateMessageReceive = message => ({
  type: UPDATE_MESSAGE_RECEIVE,
  message
});

export const deleteMessageRequest = messageSlug => ({
  type: DELETE_MESSAGE_REQUEST,
  messageSlug
});

export const deleteMessageReceive = messageSlug => ({
  type: DELETE_MESSAGE_RECEIVE,
  messageSlug
});

export const deleteMessageFailure = messageSlug => ({
  type: DELETE_MESSAGE_FAILURE,
  messageSlug
});
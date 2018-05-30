export const CREATE_REACTION_REQUEST = 'CREATE_REACTION_REQUEST';
export const CREATE_REACTION_RECEIVE = 'CREATE_REACTION_RECEIVE';
export const CREATE_REACTION_FAILURE = 'CREATE_REACTION_FAILURE';
export const DELETE_REACTION_REQUEST = 'DELETE_REACTION_REQUEST';
export const DELETE_REACTION_RECEIVE = 'DELETE_REACTION_RECEIVE';
export const DELETE_REACTION_FAILURE = 'DELETE_REACTION_FAILURE';

export const createReactionRequest = reaction => ({
  type: CREATE_REACTION_REQUEST,
  reaction
});

export const createReactionReceive = reaction => ({
  type: CREATE_REACTION_RECEIVE,
  reaction
});

export const createReactionFailure = errors => ({
  type: CREATE_REACTION_FAILURE,
  errors
});

export const deleteReactionRequest = reactionId => ({
  type: DELETE_REACTION_REQUEST,
  reactionId
});

export const deleteReactionReceive = reaction => ({
  type: DELETE_REACTION_RECEIVE,
  reaction
});

export const deleteReactionFailure = errors => ({
  type: DELETE_REACTION_FAILURE,
  errors
});


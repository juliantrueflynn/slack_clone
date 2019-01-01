import merge from 'lodash.merge';
import {
  MESSAGE,
  HISTORY,
  PIN,
  SIGN_OUT,
  WORKSPACE,
  CHANNEL,
} from '../actions/actionTypes';

const _defaultState = {
  selectedChannel: null,
  messages: [],
  pins: [],
  members: [],
};

const displayChannelDataReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case MESSAGE.INDEX.REQUEST:
      return { ..._defaultState, selectedChannel: action.channelSlug };
    case MESSAGE.INDEX.RECEIVE: {
      const { channel, messages, pins } = action.messages;

      nextState = {
        selectedChannel: channel.slug,
        messages: messages.map(msg => msg.slug),
        pins: pins.map(pin => pin.id),
      };

      return merge({}, state, nextState);
    }
    case HISTORY.INDEX.RECEIVE: {
      const { messages } = action.messages;

      nextState = {
        messages: state.messages.concat(
          messages.filter(msg => !msg.parentMessageId).map(msg => msg.slug)
        ),
      };

      return nextState;
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { channelSlug, slug } = action.message;

      if (channelSlug !== state.selectedChannel) {
        return state;
      }

      nextState = { messages: [...state.messages, slug] };

      return merge({}, state, nextState);
    }
    case MESSAGE.DESTROY.RECEIVE: {
      const { channelSlug, slug } = action.message;

      if (channelSlug !== state.selectedChannel) {
        return state;
      }

      nextState = { messages: state.messages.filter(msg => msg.slug === slug) };

      return merge({}, state, nextState);
    }
    case CHANNEL.SHOW.RECEIVE: {
      const { pins } = action.channel;
      nextState = { pins: pins.map(pin => pin.id) };

      return merge({}, state, nextState);
    }
    case PIN.CREATE.RECEIVE: {
      const { id, channelSlug } = action.pin;

      if (channelSlug !== state.selectedChannel) {
        return state;
      }

      nextState = { pins: [...state.pins, id] };

      return merge({}, state, nextState);
    }
    case PIN.DESTROY.RECEIVE: {
      const { id, channelSlug } = action.pin;

      if (channelSlug !== state.selectedChannel) {
        return state;
      }

      nextState = { pins: state.pins.filter(val => val !== id) };

      return merge({}, state, nextState);
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default displayChannelDataReducer;

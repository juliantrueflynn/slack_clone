import { DROPDOWN_UPDATE } from '../actions/actionTypes';

const _defaultState = { dropdownType: null, dropdownProps: {} };

const dropdownReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case DROPDOWN_UPDATE: {
      const { dropdownType, dropdownProps } = action;

      if (!dropdownType) {
        return _defaultState;
      }

      return { dropdownType, dropdownProps };
    }
    default:
      return state;
  }
};

export default dropdownReducer;

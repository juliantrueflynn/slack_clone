const REQUEST = 'REQUEST';
const RECEIVE = 'RECEIVE';
const FAILURE = 'FAILURE';
const apiMethodsDefaults = ['INDEX', 'SHOW', 'CREATE', 'UPDATE', 'DELETE'];

export const actionTypes = base => (
  [REQUEST, RECEIVE, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {})
);

export const apiActions = (base, methods = apiMethodsDefaults) => (
  methods.reduce((acc, method) => {
    acc[method] = actionTypes(`${base}_${method}`);
    return acc;
  }, {})
);

export const actionCreator = (type, props = {}) => {
  const action = { type };
  const propKeys = Object.keys(props);

  if (propKeys.length) {
    return propKeys.reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, action);
  }

  return action;
};

// export const createActions = (base, types = []) => {
//   const initialAction = { [base]: base };

//   return types.reduce((acc, type) => {
//     if () {
//       acc[type] = `${type}_${base}`;
//     }
//     return acc;
//   }, initialAction)
// };

// export const actionCreator = (type, payload = {}) => ({ type, ...payload });

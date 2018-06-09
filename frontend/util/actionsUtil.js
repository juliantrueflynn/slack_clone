const REQUEST = 'REQUEST';
const RECEIVE = 'RECEIVE';
const FAILURE = 'FAILURE';

// export const createActions = (base, types = []) => {
//   const initialAction = { [base]: base };

//   return types.reduce((acc, type) => {
//     if () {
//       acc[type] = `${type}_${base}`;
//     }
//     return acc;
//   }, initialAction)
// };

export const actionTypes = base => (
  [REQUEST, RECEIVE, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {})
);

export const actionCreator = (type, payload = {}) => ({ type, ...payload });

// export const actionCreator = (type, ...argNames) => (...args) => {
//   const action = { type };
//   argNames.forEach((arg, i) => {
//     action[argNames[i]] = args[i];
//   });

//   return action;
// };

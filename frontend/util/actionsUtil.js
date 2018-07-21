const REQUEST = 'REQUEST';
const RECEIVE = 'RECEIVE';
const FAILURE = 'FAILURE';
const apiMethodsDefaults = ['INDEX', 'SHOW', 'CREATE', 'UPDATE', 'DESTROY'];

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

export const actionCreator = (type, payload = {}) => (
  { type, ...payload }
);

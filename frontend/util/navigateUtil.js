import history from './history';

const _defaultParams = { path: '/', push: false };

export default function navigateTo(params = _defaultParams) {
  if (params.push) {
    history.push(params.path);
  } else {
    history.replace(params.path);
  }
}
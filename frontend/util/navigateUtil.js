import history from './history';

const _defaultParams = { path: '/', push: true };

export default function navigateTo(params = _defaultParams) {
  if (params.push) {
    history.replace(params.path);
  } else {
    history.push(params.path);    
  }
}
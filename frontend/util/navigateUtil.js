import history from './history';

export default function navigateTo(params = {}) {
  const defaults = { path: '/', push: true };
  const options = Object.assign({}, defaults, params);

  if (options.push) {
    history.replace(options.path);
  } else {
    history.push(options.path);    
  }
}
import React from 'react';
import ReactDOM from 'react-dom';

const Root = <div><h1>Working!</h1></div>;

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  ReactDOM.render(Root, rootEl);
});
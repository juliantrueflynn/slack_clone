import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchMessage = messageId => (
  fetch(`api/messages/${messageId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }

    return camelizeKeys(json);
  }).catch(error => {
    throw error.message || ['Unknown message error!'];
  })
);

export const createMessage = message => (
  fetch('api/messages', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(decamelizeKeys(message, { separator: '_' }))
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return camelizeKeys(json);
  }).catch(error => {
    throw error || ['Unknown message error!'];
  })
);

export const deleteMessage = messageId => (
  fetch(`api/messages/${messageId}`, {
    method: 'DELETE',
    credentials: 'include'
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return camelizeKeys(json);
  }).catch(error => {
    throw error || ['Unknown message error!'];
  })
);
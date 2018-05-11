import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchMessage = messageSlug => (
  fetch(`api/messages/${ messageSlug }`, {
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
    credentials: 'include',
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

export const editMessage = message => (
  fetch(`api/messages/${ message.slug }`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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

export const deleteMessage = messageSlug => (
  fetch(`api/messages/${ messageSlug }`, {
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
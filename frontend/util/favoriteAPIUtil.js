import { decamelizeKeys } from 'humps';

export const fetchFavorites = () => (
  fetch('api/message_favs', {
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
    return json;
  }).catch(error => {
    throw error || ['Unknown message error!'];
  })
);

export const createFavorite = messageFav => (
  fetch('api/message_favs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(decamelizeKeys(messageFav, { separator: '_' }))
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return json;
  }).catch(error => {
    throw error || ['Unknown message error!'];
  })
);

export const deleteFavorite = messageSlug => (
  fetch(`api/message_favs/${messageSlug}`, {
    method: 'DELETE',
    credentials: 'include'
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return json;
  }).catch(error => {
    throw error || ['Unknown message error!'];
  })
);
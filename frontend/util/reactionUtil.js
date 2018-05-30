import { decamelizeKeys } from 'humps';

export const createReaction = reaction => (
  fetch('api/reactions', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(decamelizeKeys(reaction, { separator: '_' }))
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return json;
  }).catch(error => {
    throw error || ['Unknown reaction error!'];
  })
);

export const deleteReaction = reactionId => (
  fetch(`api/reactions/${reactionId}`, {
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
    throw error || ['Unknown reaction error!'];
  })
);
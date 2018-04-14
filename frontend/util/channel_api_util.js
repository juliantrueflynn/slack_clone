import { camelizeKeys } from 'humps';

export const fetchChannel = channelId => (
  fetch(`api/channels/${channelId}`, {
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
    throw error.message || ['Unknown channel error!'];
  })
);

export const createChannel = channel => (
  fetch('api/channels', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channel)
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return camelizeKeys(json);
  }).catch(error => {
    throw error || ['Unknown channel error!'];
  })
);

export const deleteChannel = channelId => (
  fetch(`api/channels/${channelId}`, {
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
    throw error || ['Unknown channel error!'];
  })
);
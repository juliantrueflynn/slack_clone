import { decamelizeKeys } from 'humps';

export const fetchChannel = channelSlug => (
  fetch(`api/channels/${channelSlug}`, {
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
    credentials: 'include',
    body: JSON.stringify(decamelizeKeys(channel, { separator: '_' }))
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return json;
  }).catch(error => {
    throw error || ['Unknown channel error!'];
  })
);

export const editChannel = channel => (
  fetch('api/channels', {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(decamelizeKeys(channel, { separator: '_' }))
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return json;
  }).catch(error => {
    throw error || ['Unknown channel error!'];
  })
);

export const deleteChannel = channelSlug => (
  fetch(`api/channels/${channelSlug}`, {
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
    throw error || ['Unknown channel error!'];
  })
);
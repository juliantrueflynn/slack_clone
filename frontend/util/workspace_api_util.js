import { decamelizeKeys, camelizeKeys } from 'humps';

export const fetchWorkspaces = () => (
  fetch('api/workspaces', {
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
    throw error.message || ['Unknown workspaces error!'];
  })
);

export const fetchWorkspace = workspaceSlug => (
  fetch(`api/workspaces/${ workspaceSlug }`, {
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
    throw error.message || ['Unknown workspaces error!'];
  })
);

export const createWorkspace = workspace => (
  fetch('api/workspaces', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(decamelizeKeys(workspace, { separator: '_' }))
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }
    return camelizeKeys(json);
  }).catch(errors => {
    throw errors || ['Unknown workspace error!'];
  })
);

export const deleteWorkspace = workspaceSlug => (
  fetch(`api/workspaces/${ workspaceSlug }`, {
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
    throw error || ['Unknown workspace error!'];
  })
);
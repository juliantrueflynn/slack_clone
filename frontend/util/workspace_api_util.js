import { camelizeKeys } from 'humps';

export const fetchWorkspaces = () => (
  $.ajax({
    url: 'api/workspaces',
    method: 'GET'
  })
);

export const fetchWorkspace = workspaceId => (
  fetch(`api/workspaces/${workspaceId}`).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }

    return json;
  })
);

export const createWorkspace = workspace => (
  fetch('api/workspaces', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workspace)
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }

    const { id, title, slug, ownerId } = camelizeKeys(json);
    return { id, title, slug, ownerId };
  }).catch(errors => {
    throw errors || ['Unknown workspace error!'];
  })
);

export const destroyworkspace = workspaceId => (
  $.ajax({
    url: `api/workspaces/${workspaceId}`,
    method: 'DELETE'
  })
);
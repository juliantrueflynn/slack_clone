import { camelizeKeys } from 'humps';

export const createWorkspaceSub = workspace => (
  fetch('api/workspace_subs', {
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
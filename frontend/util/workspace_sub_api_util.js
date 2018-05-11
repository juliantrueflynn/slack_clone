import { decamelizeKeys, camelizeKeys } from 'humps';

export const createWorkspaceSub = workspaceSub => (
  fetch('api/workspace_subs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(decamelizeKeys(workspaceSub, { separator: '_' }))
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
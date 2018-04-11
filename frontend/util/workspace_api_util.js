export const fetchWorkspaces = () => (
  $.ajax({
    url: 'api/workspaces',
    method: 'GET'
  })
);

export const fetchWorkspace = workspaceId => (
  $.ajax({
    url: `api/workspaces/${workspaceId}`,
    method: 'GET'
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
  })
  .then(response => response.json())
  .then(newWorkspace => newWorkspace)
  .catch(error => {
    throw error;
  })
);

export const destroyWorkspace = workspaceId => (
  $.ajax({
    url: `api/workspaces/${workspaceId}`,
    method: 'DELETE'
  })
);
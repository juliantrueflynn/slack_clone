export const fetchAll = userId => (
  $.ajax({
    url: 'api/workspaces',
    method: 'GET'
  })
);

export const fetch = workspaceId => (
  $.ajax({
    url: `api/workspaces/${workspaceId}`,
    method: 'GET'
  })
);

export const create = workspace => (
  $.ajax({
    url: `api/workspaces`,
    method: 'POST',
    data: { workspace }
  })
);
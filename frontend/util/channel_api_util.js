export const fetchAll = workspaceId => (
  $.ajax({
    url: `api/workspace/${workspaceId}/channels`,
    method: 'GET'
  })
);

export const fetch = channel => (
  $.ajax({
    url: `api/workspace/${channel.workspace_id}/channels/${channel.id}`,
    method: 'GET'
  })
);

export const create = channel => (
  $.ajax({
    url: `api/workspace/${channel.workspace_id}/channels`,
    method: 'POST',
    data: { channel }
  })
);

export const destroy = channel => (
  $.ajax({
    url: `api/workspace/${channel.workspace_id}/channels`,
    method: 'DELETE'
  })
);
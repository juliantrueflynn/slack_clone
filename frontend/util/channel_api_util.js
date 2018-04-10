export const fetch = channelId => (
  $.ajax({
    url: `api/channels/${channelId}`,
    method: 'GET'
  })
);

export const create = channel => (
  $.ajax({
    url: 'api/channels',
    method: 'POST',
    data: { channel }
  })
);

export const destroy = channelId => (
  $.ajax({
    url: `api/channels/${channelId}`,
    method: 'DELETE'
  })
);
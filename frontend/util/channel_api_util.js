export const fetchAll = () => (
  $.ajax({
    url: `api/channels`,
    method: 'GET'
  })
);

export const fetch = channel => (
  $.ajax({
    url: `api/channels/${channel.id}`,
    method: 'GET'
  })
);

export const create = channel => (
  $.ajax({
    url: `api/channels/${channel.id}`,
    method: 'POST',
    data: { channel }
  })
);

export const destroy = channel => (
  $.ajax({
    url: `api/channels/${channel.id}`,
    method: 'DELETE'
  })
);
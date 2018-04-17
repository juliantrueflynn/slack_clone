import { decamelizeKeys, camelizeKeys } from 'humps';

export const createChannelSub = channelSub => (
  fetch('api/channel_subs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(decamelizeKeys(channelSub, { separator: '_' }))
  }).then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json;
    }

    const { id, channelId, userId } = camelizeKeys(json);
    return { id, channelId, userId };
  }).catch(errors => {
    throw errors || ['Unknown channel error!'];
  })
);
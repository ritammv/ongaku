const BASE_URL = 'http://localhost:3001';

function fetchRequest(path: string, options?: Object) {
  return fetch(BASE_URL + path, options)
    .then((res) => (res.status < 400 ? res : Promise.reject()))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => {
      console.error('error', err);
    });
}

const getChannels = (): Promise<Channel[]> => {
  return fetchRequest('/channels/default');
};

const getPublicChannels = (): Promise<Channel[]> => {
  return fetchRequest('/channels/public');
};

const getChannel = (channelId: string): Promise<ChannelAndUsers> => {
  return fetchRequest(`/channels/${channelId}`);
};

const createChannel = (userId: number, body: Object) => {
  return fetchRequest(`/channels/users/${userId}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const subscribeToChannels = (userId: number, channels: ChannelForDb[]) => {
  return fetchRequest(`/users/${userId}/channels`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channels),
  });
};

const unsubscribeFromChannel = (userId: number, channel: Channel) => {
  return fetchRequest(`/users/${userId}/channels`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channel),
  });
};

const getFromDiscogs = (url: string, token: string, tokenSecret: string) => {
  return fetchRequest('/discogs/get', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, token, tokenSecret }),
  });
};

export {
  getChannels,
  getChannel,
  createChannel,
  subscribeToChannels,
  getPublicChannels,
  unsubscribeFromChannel,
  getFromDiscogs,
};

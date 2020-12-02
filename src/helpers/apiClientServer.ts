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

const createChannel = (body: Object) => {
  return fetchRequest('/channels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export { getChannels, createChannel };

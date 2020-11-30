/* eslint-disable no-console */
const BASE_URL: string = process.env.SERVER_PORT || 'http://localhost:4002';

const fetchRequest = (url, options) => {
  return fetch(`${BASE_URL}/${url}`, options)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => console.error(`${err.message} while fetching /${url}`));
};


export default {

  getAll: () => {
    return fetchRequest('events');
  },

  postOne: ({ title, date, venue }) => {
    return fetchRequest('events', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, date, venue })
    });
  }

};

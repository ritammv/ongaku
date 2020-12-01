import { fetchRequest } from './apiClient';

const BASE_URL = 'http://localhost:3001';


function getChannels() {
  return fetchRequest('/channels');
}

function createChannel(body, '') {
  return fetchRequest('/channels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
    
  });
}


function fetchRequest(path, options) {
  return fetch(BASE_URL +path, options)
    .then(res => res.status < 400 ? res : Promise.reject())
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => {
      console.error('error', err);
    });
}


export default {
  getChannels,
  createChannel,
};
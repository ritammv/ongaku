/* eslint-disable no-console */
// const BASE_URL: string = process.env.SERVER_PORT || 'http://localhost:4002';
// require('dotenv').config();

import { accessToken, key, secret } from '../config';

const token = accessToken || 'secret';

const SERVER_URL = 'http://localhost:3001';
const BASE_URL = 'https://api.discogs.com';

export const fetchRequest = (url:string, options?: object) => {
  return fetch(url, options)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => console.error(`${err.message} while fetching /${url}`));
};


export const getLists = (username: string, data: string) => {
  return fetchRequest(`${BASE_URL}/users/${username}/${data}?token=${token}`);
};

export const getData = (
  query: string, 
  artist: string, 
  title:string, 
  label:string,
  year:string) => {
  return fetchRequest(`https://api.discogs.com/database/search?q=${query}&title=${title}&artist=${artist}&label=${label}&year=${year}&key=${key}&secret=${secret}`, {});
};

export const savePost = (userId: string, postId: string) => {
  return fetchRequest(`${SERVER_URL}/users/${userId}/saved`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postId)
  });
};

export const getUser = (userId: string) => {
  return fetchRequest(`${SERVER_URL}/users/${userId}/`);
};
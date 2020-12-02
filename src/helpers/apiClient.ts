/* eslint-disable no-console */
// const BASE_URL: string = process.env.SERVER_PORT || 'http://localhost:4002';
// require('dotenv').config();

import { accessToken, key, secret } from '../config';

const token = accessToken || 'secret';
const BASE_URL: string = 'https://api.discogs.com';

export const fetchRequest = (url:string, options: object) => {
  return fetch(url, options)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => console.error(`${err.message} while fetching /${url}`));
};


export const getLists = (username: string, data: string) => {
  return fetchRequest(`${BASE_URL}/users/${username}/${data}?token=${token}`, {});
};

export const getData = (query: string) => {
  return fetchRequest(`${BASE_URL}/database/search?q=${query}&key=${key}&secret=${secret}`, {});
};
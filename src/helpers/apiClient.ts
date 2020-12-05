/* eslint-disable no-console */
// const BASE_URL: string = process.env.SERVER_PORT || 'http://localhost:4002';
// require('dotenv').config();

// import { accessToken, key, secret } from '../config';

const { OAuth } = require('oauth');

const oauth = new OAuth(
  'https://api.discogs.com/oauth/request_token',
  'https://api.discogs.com/oauth/access_token',
  'hOqgGkAKtjmfpFYvNhjb',
  'vgbWmkBoIOkDSxQOeuJFCqIMOBPSuiUf',
  '1.0A',
  null,
  'HMAC-SHA1'
);

// const token = accessToken || 'secret';

const SERVER_URL = 'http://localhost:3001';
const BASE_URL = 'https://api.discogs.com';

export const fetchRequest = (url: string, options?: object) => {
  return fetch(url, options)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => console.error(`${err.message} while fetching ${url}`));
};

export const getLists = (
  username: string,
  data: string,
  userToken: string,
  userTokenSecret: string
) => {
  return fetchRequest(`${BASE_URL}/users/${username}/${data}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Discogs key=${userToken}, secret=${userTokenSecret}`,
    },
  });
};

export const getData = (
  query: string,
  artist: string,
  title: string,
  label: string,
  year: string,
  userToken: string,
  userTokenSecret: string
) => {
  return fetchRequest(
    `https://api.discogs.com/database/search?q=${query}&title=${title}&artist=${artist}&label=${label}&year=${year}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Discogs key=${userToken}, secret=${userTokenSecret}`,
      },
    }
  );
};

export const savePost = (userId: number, postId: string) => {
  console.log('save', postId);
  return fetchRequest(`${SERVER_URL}/users/${userId}/saved`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
  });
};

export const removeSavedPost = (userId: number, postId: string) => {
  console.log('delete', postId);
  return fetchRequest(`${SERVER_URL}/users/${userId}/saved`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
  });
};

export const getUser = (userId: number) => {
  return fetchRequest(`${SERVER_URL}/users/${userId}/`);
};

export const checkAuthGetUser = () => {
  return fetchRequest(`${SERVER_URL}/auth/login/check`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
};

// export const oauthGet =
//   (url: string, userToken: string, userSecret: string) => {
//     return oauth.get(
//       url,
//       userToken,
//       userSecret,
//       (e: Error, data: JSON) => {
//         if (e) console.error(e);
//         console.log(JSON.parse(data));
//       }
//     );
//   };

export const getPost = (postId: string) => {
  return fetchRequest(`${SERVER_URL}/posts/${postId}/`);
};

export const createPost = (
  channelId: string,
  release: Release,
  user: User,
  postForm: FinalPost
) => {
  const dbPost = {
    userId: user.id,
    channelId,
    url: release.url,
    postTitle: postForm.message_title,
    title: release.title,
    artist: release.artists[0].name,
    year: release.year,
    label: release.labels[0].name,
    body: postForm.message_body,
    thumbnail: release.image,
  };
  return fetchRequest(`${SERVER_URL}/posts/${channelId}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dbPost),
  });
};

export const removePost = (postId: string, userId: number) => {
  console.log('delete', postId);
  return fetchRequest(`${SERVER_URL}/posts/${postId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId, userId }),
  });
};

export const createComment = (postId: string, userId: number, body: string) => {
  const dbComment = {
    postId,
    userId,
    body,
  };
  return fetchRequest(`${SERVER_URL}/posts/${postId}/comment`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dbComment),
  });
};

export const removeComment = (postId: string, commentId: string, 
  userId: number) => {
  return fetchRequest(`${SERVER_URL}/posts/${postId}/comment`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, commentId }),
  });
};


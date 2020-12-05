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

const postToDiscogs = (
  url: string,
  token: string,
  tokenSecret: string,
  postBody: string,
  postContentType: string
) => {
  return fetchRequest('/discogs/post', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      token,
      tokenSecret,
      postBody,
      postContentType,
    }),
  });
};

const putToDiscogs = (
  url: string,
  token: string,
  tokenSecret: string,
  postBody: string,
  postContentType: string
) => {
  return fetchRequest('/discogs/put', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      token,
      tokenSecret,
      postBody,
      postContentType,
    }),
  });
};
const deleteFromDiscogs = (url: string, token: string, tokenSecret: string) => {
  return fetchRequest('/discogs/delete', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, token, tokenSecret }),
  });
};

const savePost = (userId: number, postId: string) => {
  console.log('save', postId);
  return fetchRequest(`${BASE_URL}/users/${userId}/saved`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
  });
};

const removeSavedPost = (userId: number, postId: string) => {
  console.log('delete', postId);
  return fetchRequest(`${BASE_URL}/users/${userId}/saved`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
  });
};

const getUser = (userId: number) => {
  return fetchRequest(`${BASE_URL}/users/${userId}/`);
};

const checkAuthGetUser = () => {
  return fetchRequest(`${BASE_URL}/auth/login/check`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
};

//  const oauthGet =
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

const getPost = (postId: string) => {
  return fetchRequest(`${BASE_URL}/posts/${postId}/`);
};

const createPost = (
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
  return fetchRequest(`${BASE_URL}/posts/${channelId}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dbPost),
  });
};

const removePost = (postId: string, userId: number) => {
  console.log('delete', postId);
  return fetchRequest(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId, userId }),
  });
};

const createComment = (postId: string, userId: number, body: string) => {
  const dbComment = {
    postId,
    userId,
    body,
  };
  return fetchRequest(`${BASE_URL}/posts/${postId}/comment`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dbComment),
  });
};

const removeComment = (postId: string, commentId: string, userId: number) => {
  return fetchRequest(`${BASE_URL}/posts/${postId}/comment`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, commentId }),
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
  postToDiscogs,
  putToDiscogs,
  deleteFromDiscogs,
  removeComment,
  createComment,
  removePost,
  createPost,
  checkAuthGetUser,
  getUser,
  removeSavedPost,
  getPost,
  savePost,
};

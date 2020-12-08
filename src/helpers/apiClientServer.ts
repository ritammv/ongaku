const BASE_URL = 'http://localhost:3001';

const fetchRequest = (path: string, options?: Object) => {
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    },
  };
  Object.assign(defaultOptions, options || {});

  return fetch(path, defaultOptions)
    .then((res) => (res.status < 400 ? res : Promise.reject()))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => {
      console.error('error', err);
    });
};

const fetchDiscogs = (path: string, options?: Object) => {
  return fetch(path, options)
    .then((res) => (res.status < 400 ? res : Promise.reject()))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => {
      console.error('error', err);
    });
};



export const getChannels = (): Promise<Channel[]> => {
  return fetchRequest(`${BASE_URL}/channels/default`);
};

export const getAllChannels = (): Promise<Channel[]> => {
  return fetchRequest(`${BASE_URL}/channels/`);
};

export const getPublicChannels = (): Promise<Channel[]> => {
  return fetchRequest(`${BASE_URL}/channels/public`);
};

export const getChannel = (channelId: string): Promise<ChannelAndUsers> => {
  return fetchRequest(`${BASE_URL}/channels/${channelId}`);
};

export const createChannel = (userId: number, body: Object): Promise<Channel> => {
  return fetchRequest(`${BASE_URL}/channels/users/${userId}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export const subscribeToChannels = (
  userId: number,
  channels: ChannelForDb[] | { id: string }
) => {
  return fetchRequest(`${BASE_URL}/users/${userId}/channels`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channels),
  });
};

export const unsubscribeFromChannel = (userId: number, channel: Channel) => {
  return fetchRequest(`${BASE_URL}/users/${userId}/channels`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channel),
  });
};

export const getFromDiscogs = (url: string, token: string, tokenSecret: string) => {
  return fetchDiscogs(`${BASE_URL}/discogs/get`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, token, tokenSecret }),
  });
};

export const postToDiscogs = (
  url: string,
  token: string,
  tokenSecret: string,
  postBody: string,
  postContentType: string
) => {
  return fetchDiscogs(`${BASE_URL}/discogs/post`, {
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

export const putToDiscogs = (
  url: string,
  token: string,
  tokenSecret: string,
  postBody: string,
  postContentType: string
) => {
  return fetchDiscogs(`${BASE_URL}/discogs/put`, {
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
export const deleteFromDiscogs = (url: string, token: string, tokenSecret: string) => {
  return fetchDiscogs(`${BASE_URL}/discogs/delete`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, token, tokenSecret }),
  });
};

export const savePost = (userId: number, postId: string) => {
  return fetchRequest(`${BASE_URL}/users/${userId}/savedPosts`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
  });
};

export const removeSavedPost = (postId: string, userId: number) => {
  console.log('delete', postId);
  return fetchRequest(`${BASE_URL}/users/${userId}/savedPosts`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
  });
};

export const getUser = (userId: number) => {
  return fetchRequest(`${BASE_URL}/users/${userId}/`);
};

export const checkAuthGetUser = () => {
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

export const getPost = (postId: string) => {
  return fetchRequest(`${BASE_URL}/posts/${postId}/`);
};

export const getForLater = (userId: number) => {
  return fetchRequest(`${BASE_URL}/users/${userId}/savedPosts`);
};

export const createPost = (
  channelId: string,
  release: Release,
  user: User,
  postForm: FinalPost,
  token: string,
  tokenSecret: string
) => {
  console.log(release);
  return getFromDiscogs(release.url.split('.com')[1], token, tokenSecret)
    .then((result) => {
      const dbPost = {
        userId: user.id,
        channelId,
        url: release.url,
        postTitle: postForm.message_title,
        title: result.title ? result.title : null,
        artist: result.artists ? result.artists[0].name : null,
        label: release.labels ? release.labels[0].name : null,
        body: postForm.message_body,
        thumbnail: release.image ? release.image : result.images[0].url,
      };
      return fetchRequest(`${BASE_URL}/posts/${channelId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbPost),
      });
    });
};

export const removePost = (postId: string, userId: number) => {
  return fetchRequest(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
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
  return fetchRequest(`${BASE_URL}/posts/${postId}/comment`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dbComment),
  });
};

export const removeComment = (postId: string, commentId: string, userId: number) => {
  return fetchRequest(`${BASE_URL}/posts/${postId}/comment/${commentId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
};

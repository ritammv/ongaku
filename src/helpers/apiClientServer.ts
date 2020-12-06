const BASE_URL = 'http://localhost:3001';

function fetchRequest(path: string, options?: Object) {
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    }
  };

  Object.assign(defaultOptions, options || {});

  return fetch(path, defaultOptions)
    .then((res) => (res.status < 400 ? res : Promise.reject()))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => {
      console.error('error', err);
    });
}

const getChannels = (): Promise<Channel[]> => {
  return fetchRequest(`${BASE_URL}/channels/default`);
};

const getPublicChannels = (): Promise<Channel[]> => {
  return fetchRequest(`${BASE_URL}/channels/public`);
};

const getChannel = (channelId: string): Promise<ChannelAndUsers> => {
  return fetchRequest(`${BASE_URL}/channels/${channelId}`);
};

const createChannel = (userId: number, body: Object) => {
  return fetchRequest(`${BASE_URL}/channels/users/${userId}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const subscribeToChannels = (userId: number, channels: ChannelForDb[]) => {
  return fetchRequest(`${BASE_URL}/users/${userId}/channels`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channels),
  });
};

const unsubscribeFromChannel = (userId: number, channel: Channel) => {
  return fetchRequest(`${BASE_URL}/users/${userId}/channels`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channel),
  });
};

const getFromDiscogs = (url: string, token: string, tokenSecret: string) => {
  return fetchRequest(`${BASE_URL}/discogs/get`, {
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
  return fetchRequest(`${BASE_URL}/discogs/post`, {
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
  return fetchRequest(`${BASE_URL}/discogs/put`, {
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
  return fetchRequest(`${BASE_URL}/discogs/delete`, {
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

const removeSavedPost = (postId: string, userId: number) => {
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

const getPost = (postId: string) => {
  return fetchRequest(`${BASE_URL}/posts/${postId}/`);
};

const getForLater = (userId: number) => {
  return fetchRequest(`${BASE_URL}/users/${userId}/saved`);
};

const createPost = (
  channelId: string,
  release: Release,
  user: User,
  postForm: FinalPost
) => {
  return fetchRequest(release.url).then((moreInfo) => {
    console.log(moreInfo);
    console.log(release);
    const dbPost = {
      userId: user.id,
      channelId,
      url: moreInfo.resource_url,
      postTitle: postForm.message_title,
      title: moreInfo.title ? moreInfo.title : null,
      artist: moreInfo.artists ? moreInfo.artists[0].name : null,
      year: moreInfo.year ? moreInfo.year : null,
      label: release.labels ? release.labels[0] : null,
      body: postForm.message_body,
      thumbnail: release.image ? release.image : null,
      // masterUrl: moreInfo.master_url
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
  getForLater,
};

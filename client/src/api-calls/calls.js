import { state } from '../state/state.js';

async function performFetch(path) {
  const URL = `${window.location.origin}/api/${path}`;

  const encodedURL = encodeURI(URL);
  const response = await fetch(encodedURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: state.token === undefined ? '' : `Bearer ${state.token}`,
      Username: state.username === undefined ? '' : state.username,
    },
  });
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}\n-> ${URL}`);
  }
  const data = await response.json();

  return data;
}

async function performPost(path, body) {
  const URL = `${window.location.origin}/api/${path}`;

  const encodedURL = encodeURI(URL);
  const response = await fetch(encodedURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: state.token === undefined ? '' : `Bearer ${state.token}`,
      Username: state.username === undefined ? '' : state.username,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}\n-> ${URL}`);
  }
  const data = await response.json();

  return data;
}

export const fetchChannels = async () => {
  return await performFetch('channels');
};

export const fetchMessagesForChannel = async (channelId) => {
  if (!channelId) {
    return [];
  }
  return await performFetch(`channels/${channelId}/messages`);
};

export const postChannel = async (channelName) => {
  return await performPost('channels', { name: channelName });
};

export const postMessage = async (message) => {
  return await performPost(`channels/${state.currentChannelId}/messages`, {
    user: state.username,
    text: message,
  });
};

export const postRegisterUser = async (username, password) => {
  return await performPost('/register', {
    username,
    password,
  });
};

// export const postLogin = async (username, password) => {
//   return await performPost('/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       username: username,
//       password: password,
//     }),
//   });
// };

export const postLoginUser = async (username, password) => {
  return await performPost('login', {
    username,
    password,
  });
};

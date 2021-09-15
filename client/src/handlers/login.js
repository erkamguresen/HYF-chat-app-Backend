import { postLoginUser } from '../api-calls/calls.js';
import { homePage } from '../components/home-page.component.js';
import { loginPageComponent } from '../components/login-page.component.js';

import { state } from '../state/state.js';

export async function loginUser(event) {
  event.preventDefault();
  event.stopPropagation();

  const btn = document.getElementById('login-submit-btn');
  btn.disabled = true;

  setTimeout(() => {
    btn.disabled = false;
  }, 1000);

  const response = await postLoginUser(
    event.target[0].value,
    event.target[1].value
  );

  if (response.error) {
    const warningDisplay = document.getElementById('error');
    warningDisplay.innerHTML = `<i class="fa fa-times-circle"></i> ${response.error}`;
    warningDisplay.style.display = 'block';

    const successDisplay = document.getElementById('success');
    successDisplay.style.display = 'none';

    setTimeout(() => {
      warningDisplay.innerHTML = '';
      warningDisplay.style.display = 'none';
    }, 5000);
    return;
  }

  if (response.username) {
    const successDisplay = document.getElementById('success');
    successDisplay.innerHTML = `<i class="fa fa-check"></i> User 
    <span>${response.username}</span> is successfully logged in!`;
    successDisplay.style.display = 'block';

    const warningDisplay = document.getElementById('error');
    warningDisplay.style.display = 'none';

    setTimeout(() => {
      successDisplay.innerHTML = '';
      successDisplay.style.display = 'none';
    }, 3000);
  }

  // console.log(response);

  // auth procedures
  state.token = response.token;
  state.username = response.username;
  state.isSignedIn = true;

  // TODO redirect to the chat page
  if (state.isSignedIn) {
    startApplication();
  }
  // console.log('state', state);
}

export function loginUserLink(event) {
  event.preventDefault();
  event.stopPropagation();

  const root = document.getElementById('root');
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  const loginPage = loginPageComponent();

  root.appendChild(loginPage);
}

async function startApplication() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  const res = await homePage();
  root.append(res);
}

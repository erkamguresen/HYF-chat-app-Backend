import { postRegisterUser } from '../api-calls/calls.js';

import { registerPageComponent } from '../components/register-page.component.js';

export async function registerUser(event) {
  event.preventDefault();
  event.stopPropagation();

  const btn = document.getElementById('register-submit-btn');
  btn.disabled = true;

  setTimeout(() => {
    btn.disabled = false;
  }, 2000);

  if (event.target[1].value !== event.target[2].value) {
    const warningDisplay = document.getElementById('error');
    warningDisplay.innerHTML = 'Passwords do not match!';
    warningDisplay.style.display = 'block';

    setTimeout(() => {
      warningDisplay.innerHTML = '';
      warningDisplay.style.display = 'none';
    }, 3000);
    return;
  }

  const response = await postRegisterUser(
    event.target[0].value,
    event.target[1].value
  );

  if (response.error) {
    const warningDisplay = document.getElementById('error');
    warningDisplay.innerHTML = `<i class="fa fa-times-circle"></i> ${response.error}`;
    warningDisplay.style.display = 'block';

    setTimeout(() => {
      warningDisplay.innerHTML = '';
      warningDisplay.style.display = 'none';
    }, 3000);
    return;
  }

  if (response.username) {
    const successDisplay = document.getElementById('success');
    successDisplay.innerHTML = `<i class="fa fa-check"></i> User <span>${response.username}</span> is successfully added!`;
    successDisplay.style.display = 'block';

    setTimeout(() => {
      successDisplay.innerHTML = '';
      successDisplay.style.display = 'none';
    }, 3000);
  }
}

export function registerUserLink(event) {
  event.preventDefault();
  event.stopPropagation();

  const root = document.getElementById('root');
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  const registerPage = registerPageComponent();

  root.appendChild(registerPage);
}

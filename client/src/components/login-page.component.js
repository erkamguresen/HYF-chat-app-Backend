import { loginUser } from '../handlers/login.js';
import { registerUserLink } from '../handlers/register.js';

export const loginPageComponent = () => {
  const container = document.createElement('div');
  container.style = 'height:100%;';
  container.className = 'flex-container flex-column';

  container.innerHTML = `
      <div id="error">
        <i class="fa fa-times-circle"></i> <span id="error-text"></span>
      </div>
      <div id="success">
        <span id="success-tex"></span>
      </div>
      <form action="" id="login-form">
        <h3>Login to HYF Chat App</h3>
        <div>
          <label for="username">Username* : </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            required
          />
        </div>
        <div>
          <label for="password">Password * : </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>

        <div class="d-flex justify-content-between">
          <input
            type="button"
            value="Register"
            id="register-link-btn"
            class="btn btn-outline-secondary"
          />

          <input
            type="submit"
            value="Submit"
            id="login-submit-btn"
            class="btn btn-outline-primary"
          />
        </div>
      </form>
  `;

  container.querySelector('#login-form').addEventListener('submit', loginUser);

  container
    .querySelector('#register-link-btn')
    .addEventListener('click', registerUserLink);

  return container;
};

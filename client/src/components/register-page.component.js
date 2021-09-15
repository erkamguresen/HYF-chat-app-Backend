import { loginUserLink } from '../handlers/login.js';
import { registerUser } from '../handlers/register.js';

export const registerPageComponent = () => {
  const container = document.createElement('div');
  container.style = 'height:100%;';
  container.className = 'flex-container flex-column';

  container.innerHTML = `
  <h1>
    Welcome to
    <img src="../../favicon-32x32.png" alt="Hack Your Future Belgium" />
    Chat App
  </h1>
  <h2>Backend Project Student Demo</h2>
  <br />
  <h3>Please register a new user</h3>

  <!-- success & error panels -->
  <div id="error">
    <i class="fa fa-times-circle"></i> <span id="error-text"></span>
  </div>
  <div id="success">
    <span id="success-tex"></span>
  </div>

  <!-- register form -->
  <form action="" id="register-form">
    <div class="input-container">
      <div>
        <input
          type="text"
          id="username"
          placeholder="Username*"
          name="username"
          required
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder="Password*"
          name="password"
          required
        />
      </div>
      <div>
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm Password*"
          name="confirm-password"
          required
        />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <input
        type="button"
        value="Login"
        id="login-link-btn"
        class="btn btn-outline-secondary"
      />

      <input
        type="submit"
        value="Submit"
        id="register-submit-btn"
        class="btn btn-outline-primary"
      />
    </div>
  </form>
  `;

  container
    .querySelector('#register-form')
    .addEventListener('submit', registerUser);

  container
    .querySelector('#login-link-btn')
    .addEventListener('click', loginUserLink);
  return container;
};

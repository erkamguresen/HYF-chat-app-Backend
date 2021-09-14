import { homePage } from './components/home-page.component.js';
import { loginPageComponent } from './components/login-page.component.js';

const root = document.getElementById('root');
while (root.firstChild) {
  root.removeChild(root.firstChild);
}
const loginPage = loginPageComponent();

root.appendChild(loginPage);

// async function startApplication() {
//   const root = document.getElementById('root');
//   root.innerHTML = '';
//   const res = await homePage();
//   root.append(res);
// }

// startApplication();

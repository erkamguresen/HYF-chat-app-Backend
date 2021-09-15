import { homePage } from './components/home-page.component.js';
import { loginPageComponent } from './components/login-page.component.js';

const root = document.getElementById('root');
while (root.firstChild) {
  root.removeChild(root.firstChild);
}
const loginPage = loginPageComponent();

root.appendChild(loginPage);


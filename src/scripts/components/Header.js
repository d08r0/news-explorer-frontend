import { myNewsExplorerApi } from "../constants/Constants";

const menuAuthorization = document.querySelector('.menu__authorization');
const menuNoAuthorization = document.querySelector('.menu__no-authorization');

const menuLogoutButton = document.querySelector('.menu__logout-button');

export default class Header {
  constructor() {
  }

  // Рендер Header
  render(isLoggedIn) {

    if (isLoggedIn) {
      menuNoAuthorization.classList.add('header__hide');

      myNewsExplorerApi.getUserData().then((data) => {
        menuLogoutButton.textContent = data.name;
      });

    } else {
      menuAuthorization.classList.add('header__hide');
    }
  }
}



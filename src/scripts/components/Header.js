const menuAuthorization = document.querySelector('.menu__authorization');
const menuNoAuthorization = document.querySelector('.menu__no-authorization');

export default class Header {
  constructor() {
  }

  // Рендер Header
  render(isLoggedIn) {
    if (isLoggedIn) {
      menuNoAuthorization.classList.add('menu__hide');
    } else {
      menuAuthorization.classList.add('menu__hide');
    }
  }

}



const noResults = document.querySelector('.not-found');
const noResultsText = document.querySelector('.not-found__text');
const noResultsTitle = document.querySelector('.not-found__title');

const errorResultText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';


// Возвращает юзера
function getUser(item) {
  return localStorage.getItem(item);
  // return JSON.parse(localStorage.getItem(item));
}

// Возвращает профиль юзера
const getProfile = getUser('token');

// Прелоудер
function preloader(flag) {
  const newsSearch = document.querySelector('.preloader');
  if (flag) {
    newsSearch.classList.add('preloader_is-opened');
  } else {
    newsSearch.classList.remove('preloader_is-opened');
  }
}

// Ничего не найдено
function emptyResults(flag) {
  if (flag) {
    noResultsTitle.classList.add('not-found__title_is-opened');
    noResults.classList.add('not-found_is-opened');
    noResultsText.textContent = '';
    noResultsText.textContent = emptyResultText;
  } else {
    noResultsTitle.classList.remove('not-found__title_is-opened');
    noResults.classList.remove('not-found_is-opened');
    noResultsText.textContent = '';
  }
}

// Ошибка сервера
function errorResults(flag) {
  if (flag) {
    noResultsTitle.classList.remove('not-found__title_is-opened');
    noResults.classList.add('not-found_is-opened');
    noResultsText.textContent = '';
    noResultsText.textContent = errorResultText;
  } else {
    noResultsTitle.classList.add('not-found__title_is-opened');
    noResults.classList.remove('not-found_is-opened');
    noResultsText.textContent = '';
  }
}

// удаление карточек
function removeAllChild(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export {
  removeAllChild,
  preloader,
  emptyResults,
  errorResults,
  getProfile,
  getUser,
};

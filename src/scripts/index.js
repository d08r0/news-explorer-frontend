import "../pages/index.css";
import Popup from './components/Popup';
import FormValidator from "./components/FormValidator";
import {header, myNewsExplorerApi, newsApi, NO_INTERNET, USER_EXISTS, USER_NOT_REGISTERED} from "./constants/Constants";
import {emptyResults, errorResults, getProfile, logout, preloader, removeAllChild} from "./utils/utils.js";

import NewsCard from "./components/NewsCard";
import NewsCardList from "./components/NewsCardList";

const popupSignin = document.querySelector('.popup-signin');
const popupSignup = document.querySelector('.popup-signup');
const popupSuccessful = document.querySelector('.popup-successful');

const popupMenuAuthorization = document.querySelector('.popup-menu__authorization');
const popupMenuNoAuthorization = document.querySelector('.popup-menu__no-authorization');

const formSignin = document.forms.formSignun;
const formSignup = document.forms.formSignup;
const newEmail = formSignup.elements.newEmail;
const newPassword = formSignup.elements.newPassword;
const newName = formSignup.elements.newName;

const email = formSignin.elements.userEmail;
const password = formSignin.elements.userPassword;

const buttonAuthorization = document.querySelector('.menu__authorization-button');
const buttonPopupSignupClose = document.querySelector('.signup-popup__close');
const buttonPopupSigninClose = document.querySelector('.signin-popup__close');

const buttonPopupSuccessfulClose = document.querySelector('.popup-successful__close');
const popupSignupButton = document.querySelector('.signup-popup__button');
const popupSigninButton = document.querySelector('.signin-popup__button');

const searchForm = document.querySelector('.search__search-field');

const showMoreButton = document.querySelector('.results__more-button');
const results = document.querySelector('.results');
const resultsList = document.querySelector('.results__list');

const logoutButton = document.querySelector('.menu__logout');
const popupSigninToSignupButton = document.querySelector('.popup__signup-button');
const popupSignupToSigninButton = document.querySelector('.popup__login-button');
const popupSuccessfulEnter = document.querySelector('.popup-successful__enter');

const menuSandwichButton = document.querySelector('.menu__sandwich');


const maxCount = 3;

header.render(getProfile);

console.log(`Bearer ${localStorage.getItem('token')}`);
console.log('Bearer' + localStorage.getItem('token'));
console.log(typeof 'Bearer');

// пустой массив и счетчик, нужные для работы moreResults()
let cardElementArray = [];
let from = 0;

// рендер карточек, в т.ч. по кнопке Показать ещe
function moreResults() {
  let until = from + maxCount;
  if (until > cardElementArray.length) {
    until = cardElementArray.length;
    showMoreButton.classList.remove('results__more-button_is-opened');
  }
  const sliceRenderArray = cardElementArray.slice(from, until);
  const cardList = new NewsCardList(resultsList, sliceRenderArray);
  cardList.renderResults();
  from = until;
  return from;
}

// Рендер карточек и ошибок
function cardRender(event) {
  event.preventDefault();
  cardElementArray = [];
  from = 0;
  removeAllChild(resultsList);
  emptyResults(false);
  errorResults(false);
  const searchInput = document.forms.search.elements.keyword;
  preloader(true);
  newsApi.getNews(searchInput.value)
    .then((data) => {
      const dataArticles = data.articles;
      if (dataArticles.length === 0) {
        showMoreButton.classList.remove('results__more-button_is-opened');
        emptyResults(true);
      } else {
        if (dataArticles.length <= 3) {
          showMoreButton.classList.remove('results__more-button_is-opened');
        } else {
          showMoreButton.classList.add('results__more-button_is-opened');
        }
        dataArticles.forEach((item) => {
          const {cardElement} = new NewsCard(item, searchInput.value);
          cardElementArray.push(cardElement);
          results.classList.add('results_is-opened');
        });
      }
      preloader(false);
      moreResults();
      return cardElementArray;
    })
    .catch(() => {
      errorResults(true);
    })
    .finally(() => {
      preloader(false);
    });
}


//Рендер попапа успешной регистрации
function handlerRenderPopupSuccessful() {
  const popup = new Popup(popupSuccessful);
  closePopupSignup();
  popup.open();
}

//Рендер попапа входа
function handlerRenderPopupSignin() {
  const popup = new Popup(popupSignin);
  const popupButton = formSignin.querySelector('.popup__button');
  const formValidator = new FormValidator(formSignin);

  formValidator.setEventListeners()
  popupButton.setAttribute('disabled', "");
  formValidator.resetError(formSignin);
  formSignin.reset();
  popup.open();
}

//Рендер попапа регистрации
function handlerRenderPopupSignup() {
  const popup = new Popup(popupSignup);
  const popupButton = formSignup.querySelector('.popup__button');
  const formValidator = new FormValidator(formSignup);

  closePopupSignin();

  formValidator.setEventListeners()
  popupButton.setAttribute('disabled', "");
  formValidator.resetError(formSignup);
  formSignup.reset();
  popup.open();
}

// Рендер мобильного меню
// function handlerMobileMenu() {
//
//   if (getProfile) {
//     popupMenuAuthorization.style.setProperty('display', 'block');
//   } else {
//     popupMenuNoAuthorization.style.setProperty('display', 'block');
//   }
// }

// Рендер мобильного меню
function handlerMobileMenu() {
  if (getProfile) {
    popupMenuAuthorization.classList.toggle('menu__show');
  } else {
    popupMenuNoAuthorization.classList.toggle('menu__show');
  }
}

//Закрытие попапа регистрации
function closePopupSignup() {
  const popup = new Popup(popupSignup);
  popup.close();
}

//Закрытие попапа авторизации
function closePopupSignin() {
  const popup = new Popup(popupSignin);
  popup.close();
}

// Переход с попапа регистрации на попап авторизации
function signupToSignin() {
  closePopupSignup();
  handlerRenderPopupSignin();
}

// Переход с попапа успешной регистрации на попап авторизации
function successfulToSignin() {
  const popup = new Popup(popupSuccessful);

  popup.close();
  handlerRenderPopupSignin();
}

// Регистрация пользователя
function signup(event) {
  event.preventDefault();
  const userEmail = newEmail.value;
  const userPassword = newPassword.value;
  const userName = newName.value;

  myNewsExplorerApi.signup(userEmail, userPassword, userName)
    .then(() => {
      handlerRenderPopupSuccessful();
    })
    .catch((err) => {
      if (err === '500') {
        formSignup.setServerError(USER_EXISTS);
      } else if (err === 'TypeError: Failed to fetch') {
        formSignup.setServerError("NO_INTERNET");
      }
    });
}

// Вход пользователя
function signin(event) {
  event.preventDefault();
  const userEmail = email.value;
  const userPassword = password.value;

  myNewsExplorerApi.signin(userEmail, userPassword)
    .then((data) => {
      closePopupSignin();
      document.location.reload();
    })
    .catch((err) => {
      if (err === '401') {
        formSignin.setServerError(WRONG);
      } else if (err === 'TypeError: Failed to fetch') {
        formSignin.setServerError(NO_INTERNET);
      } else {
        formSignin.setServerError(USER_NOT_REGISTERED);
      }
    });
}

buttonPopupSignupClose.addEventListener('click', () => {
  const popup = new Popup(popupSignup);
  popup.close();
});

buttonPopupSuccessfulClose.addEventListener('click', () => {
  const popup = new Popup(popupSuccessful);
  popup.close();
});

buttonAuthorization.addEventListener('click', handlerRenderPopupSignin);
popupSignupButton.addEventListener('click', signup);
popupSigninButton.addEventListener('click', signin);
showMoreButton.addEventListener('click', moreResults);
searchForm.addEventListener('submit', cardRender);
logoutButton.addEventListener('click', logout);
popupSigninToSignupButton.addEventListener('click', handlerRenderPopupSignup);
popupSignupToSigninButton.addEventListener('click', signupToSignin);

popupSuccessfulEnter.addEventListener('click', successfulToSignin);

buttonPopupSigninClose.addEventListener('click', closePopupSignin);

menuSandwichButton.addEventListener('click', handlerMobileMenu);

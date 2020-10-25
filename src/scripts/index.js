import "../pages/index.css";
import Popup from './components/Popup';
import FormValidator from "./components/FormValidator";
import {header, myNewsExplorerApi, newsApi, NO_INTERNET, USER_EXISTS, USER_NOT_REGISTERED} from "./constants/Constants";
import {emptyResults, errorResults, getProfile, logout, preloader, removeAllChild} from "./utils/utils.js";
import NewsCard from "./components/NewsCard";
import NewsCardList from "./components/NewsCardList";
import {
  buttonAuthorization,
  buttonPopupSigninClose,
  buttonPopupSignupClose,
  buttonPopupSuccessfulClose,
  formSignin,
  formSignup,
  logoutButton,
  menuSandwichButton,
  popupMenuAuthorization,
  popupMenuNoAuthorization,
  popupSignin,
  popupSigninButton,
  popupSigninToSignupButton,
  popupSignup,
  popupSignupButton,
  popupSignupToSigninButton,
  popupSuccessful,
  popupSuccessfulEnter,
  results,
  resultsList,
  searchForm,
  showMoreButton,
  newEmail,
  newPassword,
  newName,
  email,
  password,
} from "./constants/Elements";


const mobileMenuAuthorizationButton = document.querySelector('.mobile-menu__authorization-button');
const mobileMenuLogoutButton = document.querySelector('.mobile-menu__logout');
const menuSandwichIndex = document.querySelector('.menu__sandwich_index');



const maxCount = 3;

header.render(getProfile);
// console.log(`Bearer ${localStorage.getItem('token')}`);

// Пустой массив и счетчик, нужные для работы moreResults()
let cardElementArray = [];
let from = 0;

// Рендер карточек, в т.ч. по кнопке Показать ещe
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


// Рендер попапа успешной регистрации
function handlerRenderPopupSuccessful() {
  const popup = new Popup(popupSuccessful);
  closePopupSignup();
  popup.open();
}

// Рендер попапа входа
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

// Рендер попапа регистрации
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
function handlerMobileMenu() {
  if (getProfile) {
    popupMenuAuthorization.classList.toggle('menu__show');
  } else {
    popupMenuNoAuthorization.classList.toggle('menu__show');
  }
}

// Закрытие попапа регистрации
function closePopupSignup() {
  const popup = new Popup(popupSignup);
  popup.close();
}

// Закрытие попапа авторизации
function closePopupSignin() {
  const popup = new Popup(popupSignin);
  popup.close();
}

// Переход с попапа регистрации на попап авторизации
function handlerSignupToSignin() {
  closePopupSignup();
  handlerRenderPopupSignin();
}

// Переход с попапа успешной регистрации на попап авторизации
function handlerSuccessfulToSignin() {
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

mobileMenuAuthorizationButton.addEventListener('click', () => {
  popupMenuNoAuthorization.classList.toggle('menu__show');
  const popup = new Popup(popupSignin);
  popup.open()
});

buttonAuthorization.addEventListener('click', handlerRenderPopupSignin);
popupSignupButton.addEventListener('click', signup);
popupSigninButton.addEventListener('click', signin);
showMoreButton.addEventListener('click', moreResults);
searchForm.addEventListener('submit', cardRender);
logoutButton.addEventListener('click', logout);
popupSigninToSignupButton.addEventListener('click', handlerRenderPopupSignup);
popupSignupToSigninButton.addEventListener('click', handlerSignupToSignin);
popupSuccessfulEnter.addEventListener('click', handlerSuccessfulToSignin);
buttonPopupSigninClose.addEventListener('click', closePopupSignin);
menuSandwichIndex.addEventListener('click', handlerMobileMenu);
mobileMenuLogoutButton.addEventListener('click', logout);

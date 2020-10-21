import "../pages/index.css";
import Popup from './components/Popup';
import FormValidator from "./components/FormValidator";
import {myNewsExplorerApi, NO_INTERNET, USER_EXISTS, USER_NOT_REGISTERED, header} from "./constants/Constants";
import {getProfile} from "./utils/utils.js";

const popupSignin = document.querySelector('.popup-signin');
const popupSignup = document.querySelector('.popup-signup');
const popupSuccessful = document.querySelector('.popup-successful');

const formSignin = document.forms.formSignun;
const formSignup = document.forms.formSignup;
const newEmail = formSignup.elements.newEmail;
const newPassword = formSignup.elements.newPassword;
const newName = formSignup.elements.newName;

const email = formSignin.elements.userEmail;
const password = formSignin.elements.userPassword;

const buttonAuthorization = document.querySelector('.menu__authorization-button');
const buttonPopupSignupClose = document.querySelector('.signup-popup__close');
const buttonPopupSuccessfulClose = document.querySelector('.popup-successful__close');
const popupSignupButton = document.querySelector('.signup-popup__button');
const popupSigninButton = document.querySelector('.signin-popup__button');

const menuAuthorization = document.querySelector('.menu__authorization');
const menuNoAuthorization = document.querySelector('.menu__no-authorization');

header.render(getProfile)

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

  formValidator.setEventListeners()
  popupButton.setAttribute('disabled', "");
  formValidator.resetError(formSignup);
  formSignup.reset();
  popup.open();
}

//Закрытие попапарегистрации
function closePopupSignup() {
  const popup = new Popup(popupSignup);
  popup.close();
}

//Закрытие попапа авторизации
function closePopupSignin() {
  const popup = new Popup(popupSignin);
  popup.close();
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
      menuNoAuthorization.classList.toggle('menu__hide');
      menuAuthorization.classList.toggle('menu__hide');
      closePopupSignin();
      // document.location.reload();
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

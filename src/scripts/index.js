import "../pages/index.css";
import Popup from './components/Popup';
import FormValidator from "./components/FormValidator";
import {myNewsExplorerApi, NO_INTERNET, USER_EXISTS} from "./constants/Constants";

const popupSignup = document.querySelector('.popup-signup');
const formSignup = document.forms.formSignup;
const newEmail = formSignup.elements.newEmail;
const newPassword = formSignup.elements.newPassword;
const newName = formSignup.elements.newName;
const buttonAuthorization = document.querySelector('.menu__authorization-button');
const buttonPopupSignupClose = document.querySelector('.signup-popup__close');
const popupSignupButton = document.querySelector('.signup-popup__button');

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

// Регистрация пользователя
function signup(event) {
  event.preventDefault();
  const userEmail = newEmail.value;
  const userPassword = newPassword.value;
  const userName = newName.value;

  myNewsExplorerApi.signup(userEmail, userPassword, userName)
    .then(() => {
      openFormSuccessSignup();
    })
    .catch((err) => {
      if (err === '500') {
        formSignup.setServerError("NOT_UNIQUE_USER");
      } else if (err === 'TypeError: Failed to fetch') {
        formSignup.setServerError("NO_INTERNET");
      }
    });
}

buttonPopupSignupClose.addEventListener('click', () => {
  const popup = new Popup(popupSignup);
  popup.close();
});

buttonAuthorization.addEventListener('click', handlerRenderPopupSignup);
popupSignupButton.addEventListener('click', signup);

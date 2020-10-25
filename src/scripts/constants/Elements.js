
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
// const popupButton = formSignin.querySelector('.popup__button');
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


// const resultsList = document.querySelector('.results__list');
const favoritesUserName = document.querySelector('.favorites__user-name');
const favoritesGlobalCount = document.querySelector('.favorites__global-count');
const favoritesDifferent = document.querySelector('.favorites__different');
const favoritesKeyWords = document.querySelector('.favorites__key-words');
const favoritesWords = document.querySelector('.favorites__words');
const favoritesOthers = document.querySelector('.favorites__others');
const favoritesOthersCount = document.querySelector('.favorites__others-count');
const favoritesTextInsert = document.querySelector('.favorites__text-insert');
const menuLogoutButton = document.querySelector('.menu__logout-button');


export {
  favoritesUserName,
  favoritesGlobalCount,
  favoritesDifferent,
  favoritesKeyWords,
  favoritesWords,
  favoritesOthers,
  favoritesOthersCount,
  favoritesTextInsert,
  menuLogoutButton,
  popupSignin,
  popupSignup,
  popupSuccessful,
  popupMenuAuthorization,
  popupMenuNoAuthorization,
  formSignin,
  formSignup,
  newEmail,
  newPassword,
  newName,
  email,
  password,
  buttonAuthorization,
  buttonPopupSignupClose,
  buttonPopupSigninClose,
  buttonPopupSuccessfulClose,
  popupSignupButton,
  popupSigninButton,
  searchForm,
  showMoreButton,
  results,
  resultsList,
  logoutButton,
  popupSigninToSignupButton,
  popupSignupToSigninButton,
  popupSuccessfulEnter,
  menuSandwichButton,
}

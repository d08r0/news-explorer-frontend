import "../pages/favorites.css";
import SaveCard from "./components/SaveCard";
import NewsCardList from "./components/NewsCardList";
import {myNewsExplorerApi} from "./constants/Constants";
import {getProfile, logout} from "./utils/utils.js";

const resultsList = document.querySelector('.results__list');
const favoritesUserName = document.querySelector('.favorites__user-name');
const favoritesGlobalCount = document.querySelector('.favorites__global-count');
const favoritesDifferent = document.querySelector('.favorites__different');
const favoritesKeyWords = document.querySelector('.favorites__key-words');
const favoritesWords = document.querySelector('.favorites__words');
const favoritesOthers = document.querySelector('.favorites__others');
const favoritesOthersCount = document.querySelector('.favorites__others-count');
const favoritesTextInsert = document.querySelector('.favorites__text-insert');
const menuLogoutButton = document.querySelector('.menu__logout-button');
const mobileMenuLogoutButton = document.querySelector('.mobile-menu__logout-button');

const logoutButton = document.querySelector('.menu__logout');

const popupMenuAuthorization = document.querySelector('.popup-menu__authorization');
const menuSandwichButton = document.querySelector('.menu__sandwich_favorites');
const mobileFavoritesLogoutButton = document.querySelector('.mobile-menu-favorites__logout');

// Страница saved-articles
const NO = 'нет';
const SAVE_ONE = ' сохраненная статья';
const SAVE_TWO = ' сохраненные статьи';
const SAVE_THREE = ' сохраненных статей';

// Пустые объекты для рендера
const objKeys = {};
const sortKeys = {};

// Возвращает токен юзера
// const getProfile = getUser('token');

function startFavorites() {

  myNewsExplorerApi.getUserData().then((data) => {
    menuLogoutButton.textContent = data.name;
    mobileMenuLogoutButton.textContent = data.name;
  });


// Получения объекта вида {'ключевое слово': 'count'},
// count - число повторений
  function putKeys(data) {
    data.forEach((item) => {
      if (!objKeys.hasOwnProperty(item.keyword)) {
        objKeys[item.keyword] = 1;
      } else {
        objKeys[item.keyword] += 1;
      }
      return objKeys;
    });
  }

// Сортировка объекта по убыванию по значению ключа
  function sort(obj) {
    Object.keys(obj)
      .sort((a, b) => {
        return obj[b] - obj[a];
      })
      .forEach((v) => {
        sortKeys[v] = obj[v];
      });
  }

// Выбор падежа для 'сохраненных статей'
  function renerCase(array) {
    if (array.length === 1) {
      favoritesDifferent.textContent = SAVE_ONE;
    } else if (array.length === 2 || array.length === 3
      || array.length === 4) {
      favoritesDifferent.textContent = SAVE_TWO;
    } else if (array.length > 5 || array.length === 0) {
      favoritesDifferent.textContent = SAVE_THREE;
    }
  }

// функция рендера текстового блока
  function renderTextBlock(array, obj) {
    myNewsExplorerApi.getUserData().then((data) => {
      favoritesUserName.textContent = data.name;
    });

    favoritesTextInsert.textContent = ", у вас";

    if (Object.keys(obj).length === 0) {
      favoritesGlobalCount.textContent = NO;
      favoritesKeyWords.textContent = '';
    } else if (Object.keys(obj).length === 1) {
      favoritesGlobalCount.textContent = array.length;
      favoritesWords.textContent = Object.keys(obj);
      favoritesOthers.textContent = '';
      favoritesOthersCount.textContent = '';
    } else if (Object.keys(obj).length === 2) {
      favoritesGlobalCount.textContent = array.length;
      favoritesWords.textContent = `${Object.keys(obj)[0]}, ${Object.keys(obj)[1]}`;
      favoritesOthers.textContent = '';
      favoritesOthersCount.textContent = '';
    } else if (Object.keys(obj).length === 3) {
      favoritesGlobalCount.textContent = array.length;
      favoritesWords.textContent = `${Object.keys(obj)[0]}, ${Object.keys(obj)[1]}, ${Object.keys(obj)[2]}`;
      favoritesOthers.textContent = '';
      favoritesOthersCount.textContent = '';
    } else if (Object.keys(obj).length >= 4) {
      favoritesGlobalCount.textContent = array.length;
      favoritesWords.textContent = `${Object.keys(obj)[0]}, ${Object.keys(obj)[1]}`;
      favoritesOthersCount.textContent = ` и ${(Object.keys(obj).length - 2)} другим`;
    }
  }

// Функция рендера карточек
  function cardRender(initialCards) {
    const resultSaves = document.querySelector('.results__saves');
    if (initialCards.length === 0) {
      resultSaves.classList.remove('results_is-opened');
    } else {
      resultSaves.classList.add('results_is-opened');
      const cardElementArray = [];
      initialCards.forEach((item) => {
        const {cardElement} = new SaveCard(item);
        cardElementArray.push(cardElement);
      });
      const cardList = new NewsCardList(resultsList, cardElementArray);
      cardList.renderResults();
    }
  }

// Рендер текстового блока и карточек
  myNewsExplorerApi.getArticles()
    .then((data) => {
      console.log(data);
      const cardsArray = data;
      // const cardsArray = data.favorites;
      cardRender(cardsArray);
      putKeys(cardsArray);
      sort(objKeys);
      renerCase(cardsArray);
      renderTextBlock(cardsArray, sortKeys);
    })
    .catch((err) => {
      console.log(err);
    });

  logoutButton.addEventListener('click', logout);
  mobileFavoritesLogoutButton.addEventListener('click', logout);

  menuSandwichButton.addEventListener('click', () => {
    popupMenuAuthorization.classList.toggle('menu__show');

  });

}

if (getProfile) {
  startFavorites();
}


// Преход на главную если пользователь не авторизован
// if (getProfile) {
//   startFavorites();
// } else {
//   window.location.href = 'index.html';
// }

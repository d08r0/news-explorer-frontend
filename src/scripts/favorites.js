import "../pages/favorites.css";
import SaveCard from "./components/SaveCard";
import NewsCardList from "./components/NewsCardList";
const resultsList = document.querySelector('.results__list');
import { myNewsExplorerApi } from "./constants/Constants";

// функция рендера карточек
function cardRender(initialCards) {
  const results = document.querySelector('.results');
  if (initialCards.length === 0) {
    results.classList.remove('results_is-opened');
  } else {
    results.classList.add('results_is-opened');
    const cardElementArray = [];
    initialCards.forEach((item) => {
      const { cardElement } = new SaveCard(item);
      cardElementArray.push(cardElement);
    });
    const cardList = new NewsCardList(resultsList, cardElementArray);
    cardList.renderResults();
  }
}

// рендер текстового блока и карточек
myNewsExplorerApi.getArticles()
  .then((data) => {
    console.log(data);
    const cardsArray = data;
    // const cardsArray = data.favorites;
    cardRender(cardsArray);
    // console.log(cardsArray);
    // putKeys(cardsArray);
    // sort(objKeys);
    // renerCase(cardsArray);
    // renderTextBlock(cardsArray, sortKeys);
  });
  // .catch((err) => {
  //   console.log(err);
  // });

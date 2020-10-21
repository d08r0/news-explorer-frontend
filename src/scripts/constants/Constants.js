import MyNewsExplorerApi from '../api/MyNewsExplorerApi';
import Header from "../components/Header";

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongEmail: 'Здесь должна быть email',
}

const USER_EXISTS = 'Пользователь занят';
const NO_INTERNET = 'Отсутствует интернет соединение';
const USER_NOT_REGISTERED = 'Такого пользователя нет';

// Конфигурация MyNewsExplorerApi
const configMyNewsExplorerApi = {
  // url: 'http://api.my-news-explorer.tk/',
  url: 'http://localhost:3000',

  headers: {
    'Content-Type': 'application/json',
  }
};

// Header
const header = new Header();

const myNewsExplorerApi = new MyNewsExplorerApi(configMyNewsExplorerApi);

export {
  myNewsExplorerApi,
  errorMessages,
  NO_INTERNET,
  USER_EXISTS,
  USER_NOT_REGISTERED,
  header
}

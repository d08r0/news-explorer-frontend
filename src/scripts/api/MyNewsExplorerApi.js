export default class MyNewsExplorerApi {

  constructor(config) {
    this.url = config.url;
  }

  // Регистрация
  signup(userEmail, userPassword, userName) {

    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: userName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  // Вход
  signin(userEmail, userPassword) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        localStorage.setItem('token', JSON.stringify(data.token));
        // console.log(localStorage.getItem('token'));
        return data;
      });
  }

  // Запрос данных пользователя
  getUserData() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  // Запрос статей пользователя
  getArticles() {
    return fetch(`${this.url}/articles`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  // Создание статьи
  createArticle(userKeyword, userTitle, userText, userDate,
                userSource, userLink, userImage) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      body: JSON.stringify({
        keyword: userKeyword,
        title: userTitle,
        text: userText,
        date: userDate,
        source: userSource,
        link: userLink,
        image: userImage,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  // Удаление статьи
  removeArticle(articleId) {
    return fetch(`${this.url}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }
}

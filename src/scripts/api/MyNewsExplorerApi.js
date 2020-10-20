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
        localStorage.setItem('token', data.userToken);
        localStorage.setItem('user', JSON.stringify({
          email: data.email,
          name: data.name,
        }));
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
}

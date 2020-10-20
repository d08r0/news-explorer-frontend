export default class MyNewsExplorerApi {
  // constructor(baseUrl) {
  //   this.url = baseUrl;
  // }

  constructor(config) {
    this.url = config.url;
  }

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
}

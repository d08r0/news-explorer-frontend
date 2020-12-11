// отсчитываем 7 дней
const dateCount = 7;

const data = new Date();
const previous = new Date();
previous.setDate(previous.getDate() - dateCount);
const now = data.getFullYear() + '-'
+ (data.getMonth() + 1) + '-' + data.getDate();
const past = previous.getFullYear() + '-'
+ (previous.getMonth() + 1) + '-' + previous.getDate();

export default class NewsApi {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  getNews(UserKeyWord) {
    return fetch(`${this.baseUrl}q=${UserKeyWord}&from=${now}&to=${past}&language=ru&sortBy=popularity&pageSize=100&apiKey=${this.apiKey}`, {
      headers: {
        authorization: `Bearer ${this.apiKey}`,
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

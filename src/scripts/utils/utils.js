
// Возвращает юзера
function getUser(item) {
  return JSON.parse(localStorage.getItem(item));
}

// Возвращает профиль юзера
const getProfile = getUser('token');

export {
  getProfile,
  getUser,
};

// настройки запроса
const baseUrl = 'https://around.nomoreparties.co/v1/wff-cohort-16/'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `e53a7134-226f-47c6-920c-88993cc342dd`
}
// обработик запроса
function responce(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Error: ${res.status}`)
    }
}
// Получение карточек
export const getCards = () => {
    return fetch(`${baseUrl}cards`, {
        method: 'GET',
        headers
    }).then(responce)
}
// получение данных о пользователе
export const getUserInfo = () => {
    return fetch(`${baseUrl}users/me`, {
        method: 'GET',
        headers,
    }).then(responce)
}
// добавление новой карточки
export const addCard = (data) => {
    return fetch(`${baseUrl}cards`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }).then(responce)
}
// удаление карточки
export const deleteCardApi = (cardId) => {
    return fetch(`${baseUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers
    }).then(responce)
}
// лайк карточки
export const likeCardApi = (cardId) => {
    return fetch(`${baseUrl}cards/${cardId}/likes`, {
        method: 'PUT',
        headers
    }).then(responce)
}
// дизлайк карточки
export const dislikeCardApi = (cardId) => {
    return fetch(`${baseUrl}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers
    }).then(responce)
}
// изменение данных пользователя
export const setUserInfoApi = (data) => {
    return fetch(`${baseUrl}users/me`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data)
    }).then(responce)
}
// изменение аватара пользователя
export function setUserAvatar(data) {
    return fetch(`${baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data)
    }).then(responce)
}
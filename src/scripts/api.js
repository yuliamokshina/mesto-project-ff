const baseUrl = 'https://around.nomoreparties.co/v1/wff-cohort-16/'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `e53a7134-226f-47c6-920c-88993cc342dd`
}

function checkResponce(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Error: ${res.status}`)
    }
}

export const getCards = () => {
    return fetch(`${baseUrl}cards`, {
        method: 'GET',
        headers
    })
        .then(checkResponce)
}

export const getUserInfo = () => {
    return fetch(`${baseUrl}users/me`, {
        method: 'GET',
        headers,
    })
        .then(checkResponce)
}

export const addCard = (data) => {
    return fetch(`${baseUrl}cards`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }).then(checkResponce)
}

export const deleteCardApi = (cardId) => {
    return fetch(`${baseUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers
    }).then(checkResponce)
}

export const likeCardApi = (cardId) => {
    return fetch(`${baseUrl}cards/${cardId}/likes`, {
        method: 'PUT',
        headers
    })
        .then(checkResponce)
}

export const dislikeCardApi = (cardId) => {
    return fetch(`${baseUrl}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers
    })
        .then(checkResponce)
}

export const setUserInfoApi = (data) => {
    return fetch(`${baseUrl}users/me`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data)
    })
        .then(checkResponce)
}

export function setUserAvatar(data) {
    return fetch(`${baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data)
    })
        .then(checkResponce)
}
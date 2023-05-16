export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const URL = {
  ingredients: `${BASE_URL}/ingredients`,
  orders: `${BASE_URL}/orders`,

  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,

  forgotPassword: `${BASE_URL}/password-reset`,
  resetPassword: `${BASE_URL}/password-reset/reset`,
  
  user: `${BASE_URL}/auth/user`,
  logout: `${BASE_URL}/auth/logout`,
  token: `${BASE_URL}/auth/token`,
};

const checkResponse = res => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`)
  }
}

export const getProductData = async () => {
  return await fetch(URL.ingredients)
    .then(checkResponse)
}

export const getOrderData = async (ids) => {
  return await fetch(URL.orders, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ids
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}

export const setNewUser = async (user) => {
  return await fetch(URL.register, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}

export function loginRequest(user) {
  return fetch(URL.login, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
}

export function logoutRequest(refreshToken) {
  return fetch(URL.logout, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse);
}

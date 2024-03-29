import {
  TIngredientResponse,
  TOrderDetailsResponse,
  TUpdateUser,
  TUser,
  TUserResponce
} from '../../services/types/types';

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

  socket: `wss://norma.nomoreparties.space/orders`,
};

export const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`)
  }
}

export const getProductData = async () => {
  return await fetch(URL.ingredients)
    .then(res => checkResponse<TIngredientResponse>(res))
}

export const getOrderData = async (ids: string[], token: string | undefined) => {
  return await fetch(URL.orders, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ids
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => checkResponse<TOrderDetailsResponse>(res));
}

export const setNewUser = async (user: TUser) => {
  return await fetch(URL.register, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkResponse<TUserResponce>(res))
}

export function loginRequest(user: { email: string, password: string }) {
  return fetch(URL.login, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => checkResponse<TUserResponce>(res));
}

export function logoutRequest(refreshToken: string | null) {
  return fetch(URL.logout, {
    method: 'POST',
    body: JSON.stringify({ token: refreshToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => checkResponse<TUserResponce>(res));
}

export function resetPasswordRequest(email: {email: string}) {
  return fetch(URL.forgotPassword, {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => checkResponse<TUserResponce>(res));
}

export function changePasswordRequest(password: {password: string}) {
  return fetch(URL.resetPassword, {
    method: 'POST',
    body: JSON.stringify(password),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => checkResponse<TUserResponce>(res));
}

export function getUserRequest(accessToken: string | undefined) {
  return fetch(URL.user, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  }).then(res => checkResponse<TUserResponce>(res));
}

export function updateUserRequest(data: TUpdateUser, accessToken: string | undefined) {
  return fetch(URL.user, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  }).then(res => checkResponse<TUserResponce>(res));
}

export async function updateTokenRequest() {
  return fetch(URL.token, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(res => checkResponse<TUserResponce>(res));
}
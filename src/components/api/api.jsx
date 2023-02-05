const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = res => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`)
  }
}

export const getProductData = async () => {
  return await fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
}

export const getOrderData = async (ids) => {
  return await fetch(`${BASE_URL}/orders`, {
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

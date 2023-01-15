const BASE_URL = 'https://norma.nomoreparties.space/api';

const getProductData = async () => {
  return await fetch(`${BASE_URL}/ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
}

export default getProductData;

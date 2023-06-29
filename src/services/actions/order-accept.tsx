import { getOrderData } from '../../untils/api/api';

export const ORDER_ACCEPT_REQUEST = 'ORDER_ACCEPT_REQUEST';
export const ORDER_ACCEPT_SUCCESS = 'ORDER_ACCEPT_SUCCESS';
export const ORDER_ACCEPT_FAILED = 'ORDER_ACCEPT_FAILED';
export const CLOSE_ORDER_ACCEPT = 'CLOSE_ORDER_ACCEPT';

export function getOrder(ids, token) {
  return function (dispatch) {
    dispatch({
      type: ORDER_ACCEPT_REQUEST,
    });
    getOrderData(ids, token)
      .then((res) => {
        dispatch({
          type: ORDER_ACCEPT_SUCCESS,
          order: res,
        });
      })
      .catch((e) => {
        dispatch({
          type: ORDER_ACCEPT_FAILED,
        });
        console.log(`Упс, ошибка! ${e}`)
      })
  };
}
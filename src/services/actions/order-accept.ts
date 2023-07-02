import { getOrderData } from '../../untils/api/api';
import { TOrderDetailsResponse } from '../types/types';
import {
  CLOSE_ORDER_ACCEPT,
  ORDER_ACCEPT_REQUEST,
  ORDER_ACCEPT_SUCCESS,
  ORDER_ACCEPT_FAILED,
} from '../constants/order-accept';
import { AppDispatch } from '../types';

interface ICloseOrderAccept {
  readonly type: typeof CLOSE_ORDER_ACCEPT;
}

interface IOrderAcceptRequest {
  readonly type: typeof ORDER_ACCEPT_REQUEST;
}

interface IOrderAcceptSuccess {
  readonly type: typeof ORDER_ACCEPT_SUCCESS;
  readonly order: TOrderDetailsResponse;
}

interface IOrderAcceptFailed {
  readonly type: typeof ORDER_ACCEPT_FAILED;
}

export type TOrderAcceptActions = ICloseOrderAccept
  | IOrderAcceptRequest
  | IOrderAcceptSuccess
  | IOrderAcceptFailed;

export function getOrder(ids: string[], token: string | undefined) {
  return function (dispatch: AppDispatch) {
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
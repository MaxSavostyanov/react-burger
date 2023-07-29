import { TOrder } from '../types/types';
import { TWSActions } from '../actions/wsActions';
import {
  WS_CONNECTION_SUCCESS,
  WS_ERROR,
  WS_GET_ORDERS,
  WS_CONNECTION_CLOSED,
  WS_DISCONNECTING,
} from '../constants/ws';

type TInitialState = {
  wsConnected: boolean,
  error?: any,
  orders: TOrder[],
  total: number,
  totalToday: number,
};

const initialState: TInitialState = {
  wsConnected: false,
  error: undefined,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
    case WS_DISCONNECTING:
      return {
        ...state,
        wsConnected: false,
        error: '',
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};

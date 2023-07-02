import { TOrdersResponce } from '../types/types';
import {
  WS_CONNECTING,
  WS_DISCONNECTING,
  WS_CONNECTION_SUCCESS,
  WS_ERROR,
  WS_GET_ORDERS,
  WS_SEND_ORDER,
  WS_CONNECTION_CLOSED,
} from '../constants/ws';

export const wsActions = {
  wsConnecting: WS_CONNECTING,
  wsDisconnecting: WS_DISCONNECTING,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_ERROR,
  onMessage: WS_GET_ORDERS,
  wsSendOrder: WS_SEND_ORDER
};

interface IWSConnecting {
  readonly type: typeof WS_CONNECTING;
}

interface IWSDisconnecting {
  readonly type: typeof WS_DISCONNECTING;
}

interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWSError {
  readonly type: typeof WS_ERROR;
  readonly payload: any; 
}

interface IWSGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: TOrdersResponce;
}

interface IWSSendOrder {
  readonly type: typeof WS_SEND_ORDER;
}

interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export type TWSActions = IWSConnecting
  | IWSDisconnecting
  | IWSConnectionSuccess
  | IWSError
  | IWSGetOrders
  | IWSSendOrder
  | IWSConnectionClosed;

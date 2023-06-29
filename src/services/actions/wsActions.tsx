export const WS_CONNECTING = 'WS_CONNECTING';
export const WS_DISCONNECTING = 'WS_DISCONNECTING';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_ERROR = 'WS_ERROR';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_SEND_ORDER = 'WS_SEND_ORDER';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';

  
export const wsActions = {
    wsConnecting: WS_CONNECTING,
    wsDisconnecting: WS_DISCONNECTING,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_ERROR,
    onMessage: WS_GET_ORDERS,
    wsSendOrder: WS_SEND_ORDER
  };

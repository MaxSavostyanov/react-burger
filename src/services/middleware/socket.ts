import { Middleware, MiddlewareAPI } from "redux";
import { TWSActions } from '../types/types';



export const socketMiddleware = (wsActions: TWSActions): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsConnecting,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsDisconnecting,
      } = wsActions;

      if (type === wsConnecting) {
        url = payload;
        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          let data = JSON.parse(event.data);


          dispatch({ type: onMessage, payload: data });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsDisconnecting) {
          socket.close();
        }
      }

      next(action);
    };
  };
};


import { updateToken } from '../actions/auth';

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;
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

          if (!data.success) {
            if (data.message === 'Invalid or missing token') {
              socket.close();
              return updateToken()
                .then(() => {
                  dispatch({ type: wsConnecting });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
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

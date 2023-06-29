import {
  CLOSE_ORDER_ACCEPT,
  ORDER_ACCEPT_FAILED,
  ORDER_ACCEPT_REQUEST,
  ORDER_ACCEPT_SUCCESS
} from '../actions/order-accept';


const initialState = {
  order: null,
  orderAcceptRequest: false,
  orderAcceptFailed: false,
  isOrder: false,
};

export const orderAcceptReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ACCEPT_REQUEST: {
      return {
        ...state,
        orderAcceptRequest: true,
        orderAcceptFailed: false,
        isOrder: true,
      };
    }

    case ORDER_ACCEPT_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderAcceptFailed: false,
        orderAcceptRequest: false,
      };
    }

    case ORDER_ACCEPT_FAILED: {
      return {
        ...initialState,
        orderAcceptFailed: true,
      };
    }

    case CLOSE_ORDER_ACCEPT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
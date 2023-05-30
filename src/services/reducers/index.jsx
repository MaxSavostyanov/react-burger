import { combineReducers } from 'redux';

import { burgerСonstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderAcceptReducer } from './order-accept';
import { authReducer } from './auth';
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
  burgerConstructor: burgerСonstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderAccept: orderAcceptReducer,
  authData: authReducer,
  wsData: wsReducer,
});

export const getBurgerConstructor = (store) => store.burgerConstructor;
export const getBurgerIngredients = (store) => store.burgerIngredients;
export const getIngredientDetails = (store) => store.ingredientDetails;
export const getOrderAccept = (store) => store.orderAccept;
export const getAuthData = (store) => store.authData;
export const getOrdersData = (store) => store.wsData;
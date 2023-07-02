import { combineReducers } from 'redux';

import { burgerСonstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderAcceptReducer } from './order-accept';
import { authReducer } from './auth';
import { wsReducer } from './ws';
import { RootState } from '../types';

export const rootReducer = combineReducers({
  burgerConstructor: burgerСonstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderAccept: orderAcceptReducer,
  authData: authReducer,
  wsData: wsReducer,
});

export const getBurgerConstructor = (store: RootState) => store.burgerConstructor;
export const getBurgerIngredients = (store: RootState) => store.burgerIngredients;
export const getIngredientDetails = (store: RootState) => store.ingredientDetails;
export const getOrderAccept = (store: RootState) => store.orderAccept;
export const getAuthData = (store: RootState) => store.authData;
export const getOrdersData = (store: RootState) => store.wsData;
import { combineReducers } from 'redux';

import { burgerСonstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';

export const rootReducer = combineReducers({
  burgerConstructor: burgerСonstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
});

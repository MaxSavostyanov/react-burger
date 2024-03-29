import { TIngredient } from '../types/types';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import {
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_FAILED,
} from '../constants/burger-ingredients';

type TInitialState = {
  ingredients: TIngredient[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean
};

const initialState: TInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }

    case BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false
      };
    }

    case BURGER_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        ingredientsFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
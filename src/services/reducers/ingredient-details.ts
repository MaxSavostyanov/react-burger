import { TIngredient } from '../types/types';
import { TIngredientDetailsActions } from '../actions/ingredient-details';
import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
} from '../constants/ingredient-details';

type TInitialState = {
  openIngredient: TIngredient | null,
};

const initialState: TInitialState = {
  openIngredient: null,
};

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS: {
      return {
        ...state,
        openIngredient: action.ingredient,
      };
    }

    case CLOSE_INGREDIENT_DETAILS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
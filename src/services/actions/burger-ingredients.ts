import { getProductData } from '../../untils/api/api';
import { TIngredient } from '../types/types';

import {
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_FAILED,
} from '../constants/burger-ingredients';
import { AppDispatch } from '../types';

interface IBurgerIngredientsRequest {
  readonly type: typeof BURGER_INGREDIENTS_REQUEST;
}

interface IBurgerIngredientsSuccess {
  readonly type: typeof BURGER_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

interface IBurgerIngredientsFailed {
  readonly type: typeof BURGER_INGREDIENTS_FAILED;
}

export type TBurgerIngredientsActions = IBurgerIngredientsRequest
  | IBurgerIngredientsSuccess
  | IBurgerIngredientsFailed;

export function getBurgerIngredients() {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: BURGER_INGREDIENTS_REQUEST
    });
    getProductData()
      .then((res) => {
        dispatch({
          type: BURGER_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      })
      .catch((e) => {
        dispatch({
          type: BURGER_INGREDIENTS_FAILED,
        });
        console.log(`Упс, ошибка! ${e}`);
      })
  };
}
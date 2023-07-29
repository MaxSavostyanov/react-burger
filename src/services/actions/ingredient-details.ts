import { TIngredient } from '../types/types';
import {
  CLOSE_INGREDIENT_DETAILS,
  OPEN_INGREDIENT_DETAILS
} from '../constants';

interface IOpenIngredientDetails {
  readonly type: typeof OPEN_INGREDIENT_DETAILS;
  readonly ingredient: TIngredient;
}

interface ICloseIngredientDetails {
  readonly type: typeof CLOSE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = IOpenIngredientDetails | ICloseIngredientDetails;
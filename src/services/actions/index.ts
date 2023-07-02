import { TAuthActions } from './auth';
import { TBurgerConstructorActions } from './burger-constructor';
import { TBurgerIngredientsActions } from './burger-ingredients';
import { TIngredientDetailsActions } from './ingredient-details';
import { TOrderAcceptActions } from './order-accept';
import { TWSActions } from './wsActions';

export type TApplicationActions = TAuthActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TIngredientDetailsActions
  | TOrderAcceptActions
  | TWSActions;
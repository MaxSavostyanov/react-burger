import { TIngredient } from '../types/types';
import {
  ADD_BUN,
  ADD_FILLING,
  DELETE_FILLING,
  SWAP_FILLING,
  CLEAR_CONSTRUCTOR,
} from '../constants/burger-constructor';

interface IAddBun {
  readonly type: typeof ADD_BUN;
  readonly bun: TIngredient;
}

interface IAddFilling {
  readonly type: typeof ADD_FILLING;
  readonly filling: TIngredient;
}

interface IDeleteFilling {
  readonly type: typeof DELETE_FILLING;
  readonly filling: TIngredient;
}

interface ISwapFilling {
  readonly type: typeof SWAP_FILLING;
  readonly dropIndex: number;
  readonly dragIndex: number;
}

interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions = IAddBun
  | IAddFilling
  | IDeleteFilling
  | ISwapFilling
  | IClearConstructor;
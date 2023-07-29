import { TIngredient, TOrder } from '../services/types/types';

export const gerOrderIngredients = (order: TOrder | undefined, data: TIngredient[]) => {
  return order?.ingredients.map((id) => {
    return data?.find((ingredient) => {
      return id === ingredient._id;
    })
  })
}
import { TIngredient, TOrder } from './types';

export const gerOrderIngredients = (order: TOrder, data: TIngredient[]) => {
  return order?.ingredients.map((id) => {
    return data?.find((ingredient) => {
      return id === ingredient._id;
    })
  })
}
export const gerOrderIngredients = (order, data) => {
  return order?.ingredients.map((id) => {
    return data?.find((ingredient) => {
      return id === ingredient._id;
    })
  })
}
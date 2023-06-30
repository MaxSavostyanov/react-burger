export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
};

export type TOrder = {
  createdAt: string,
  ingredients: string[],
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string,
};

export type TUser = {
	email: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
}

export type TUpdateUser = TUser & { password: string };

export type TOrderDetailsResponse = {
	name: string
	order: TOrder;
	success: boolean;
}

export type TIngredientResponse = {
	data: Array<TIngredient>;
	success: boolean;
}

export type TUserResponce = {
	success: boolean;
	user: TUser;
	accessToken: string;
	refreshToken: string;
	message: string;
}

export type TLogoutResponse = {
	message: string;
	success: boolean;
	refreshToken: string;
}

export type TOrdersResponce = {
	success: boolean;
	total: number;
	totalToday: number;
	orders: Array<TOrder>;
}
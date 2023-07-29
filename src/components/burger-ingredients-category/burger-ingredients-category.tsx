import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';
import Item from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients-category.module.css';
import { getBurgerIngredients } from '../../services/reducers';
import { TIngredient } from '../../services/types/types';

type TCategory = {
  type: string;
  className: string;
}

const BurgerIngredientsCategory: FC<TCategory> = ({ type }: TCategory) => {
  const { ingredients: data } = useSelector(getBurgerIngredients);

  const categories: { [key: string]: string } = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки',
  }

  const ingredients: TIngredient[] = data.filter((item: TIngredient) => item.type === type);

  return (
    <li id={type} className='pb-2'>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>{categories[type]}</h2>
      <ul className={`${styles.list} pr-1`}>
        {ingredients.map((ingredient: TIngredient) => (
          <Item
            key={ingredient._id}
            ingredient={ingredient}
          />
        ))}
      </ul>
    </li>
  )
}

export default BurgerIngredientsCategory;
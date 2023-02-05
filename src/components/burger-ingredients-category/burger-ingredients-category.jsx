import React from 'react';
import PropTypes from 'prop-types';
import Item from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients-category.module.css';
import { DataContext } from '../../contexts/appContext';

export default function BurgerIngredientsCategory({ type, openIngredientDetails }) {
  const { data } = React.useContext(DataContext);

  const categories = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки',
  }

  const ingredients = data.filter((item) => item.type === type);

  return (
    <li id={type} className='pb-2'>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>{categories[type]}</h2>
      <ul className={`${styles.list} pr-1`}>
        {ingredients.map((ingredient) => (
          <Item
            key={ingredient._id}
            ingredient={ingredient}
            openIngredientDetails={openIngredientDetails}
          />
        ))}
      </ul>
    </li>
  )
}

BurgerIngredientsCategory.propTypes = {
  type: PropTypes.string.isRequired,
  openIngredientDetails: PropTypes.func.isRequired,
}


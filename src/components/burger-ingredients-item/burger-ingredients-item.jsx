import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients-item.module.css';
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientProps from '../../untils/prop-types';

export default function BurgerIngredientsItem({ ingredient, openIngredientDetails }) {
  return (
    <div
      className={`${styles.item} ml-3 mr-3 pb-8`}
      onClick={(e) => openIngredientDetails(e, ingredient)}
    >
      <img className={`${styles.image} pl-4 pr-4`} src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.price} pt-1 pb-1`}>
        <p className='text text_type_digits-default pr-2'>{ingredient.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      <Counter count={1} size='default' />
    </div>
  )
}

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientProps.isRequired,
  openIngredientDetails: PropTypes.func.isRequired,
}

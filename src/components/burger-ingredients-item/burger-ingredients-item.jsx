import React from 'react';
import styles from './burger-ingredients-item.module.css';
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientProps } from '../../untils/prop-types';


export default function BurgerIngredientsItem(props) {
  return (
    <div className={`${styles.item} ml-3 mr-3 pb-8`}>
      <img className={`${styles.image} pl-4 pr-4`} src={props.ingredient.image} alt={props.ingredient.name} />
      <div className={`${styles.price} pt-1 pb-1`}>
        <p className='text text_type_digits-default pr-2'>{props.ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{props.ingredient.name}</p>
      <Counter count={1} size="default" />
    </div>
  )
}

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientProps.isRequired,
}
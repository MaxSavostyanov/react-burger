import React from 'react';
import PropTypes from "prop-types";
import Item from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients-category.module.css';
import { ingredientProps } from '../../untils/prop-types';

export default function BurgerIngredientsCategory({ type, data }) {
  const categories = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки',
  }

  const ingredients = data.filter((item) => item.type === type);

  return (
    <li className='pt-2' id={type}>
      <h2 className={`${styles.title} text text_type_main-medium pb-6 pt-2`}>{categories[type]}</h2>
      <ul className={`${styles.list} pr-1`}>
        {ingredients.map((ingredient) => (
          <Item key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </li>
  )
}

BurgerIngredientsCategory.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingredientProps).isRequired,
}


import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBurgerIngredients } from '../../services/reducers';
import styles from './ingredient-details.module.css'

export default function IngredientDetails({ isBackground }) {
  const { ingredients } = useSelector(getBurgerIngredients);
  const { id } = useParams();
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  const IngredientDetailsModal = () => {
    return ingredient ? (
      <div className={`${styles.container} pb-5`}>
        <h2 className={`${styles.title} text text_type_main-large pt-4 pb-5`}>
          Детали ингредиента
        </h2>

        <img
          src={ingredient.image_large}
          alt={ingredient.name}
        />

        <h3 className='text text_type_main-medium pt-4 pb-4'>
          {ingredient.name}
        </h3>

        <ul className={`${styles.list} pt-4 pb-5`}>
          <li className={`${styles.item}`}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Калории,ккал
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              {ingredient.calories}
            </p>
          </li>

          <li className={`${styles.item}`}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Белки, г
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              {ingredient.proteins}
            </p>
          </li>

          <li className={`${styles.item}`}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Жиры, г
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              {ingredient.fat}
            </p>
          </li>

          <li className={`${styles.item}`}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Углеводы, г
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    ) : null;
  }

  const IngredientDetailsRoute = () => {
    return ingredient ? (
      <div className={`${styles.containerRoute} pb-5`}>
        <h2 className={`${styles.titleRouter} text text_type_main-large pt-4 pb-5`}>
          Детали ингредиента
        </h2>

        <img
          src={ingredient.image_large}
          alt={ingredient.name}
        />

        <h3 className='text text_type_main-medium pt-4 pb-4'>
          {ingredient.name}
        </h3>

        <ul className={`${styles.list} pt-4 pb-5`}>
          <li className={`${styles.item}`}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Калории,ккал
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              {ingredient.calories}
            </p>
          </li>

          <li className={`${styles.item}`}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Белки, г
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              {ingredient.proteins}
            </p>
          </li>

          <li className={`${styles.item}`}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Жиры, г
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              {ingredient.fat}
            </p>
          </li>

          <li className={`${styles.item}`}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Углеводы, г
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    ): null;
  }

  return isBackground
    ? <IngredientDetailsModal />
    : <IngredientDetailsRoute />
}


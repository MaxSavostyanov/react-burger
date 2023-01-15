import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients-item.module.css';
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientProps from '../../untils/prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


export default function BurgerIngredientsItem({ ingredient }) {
  const [isOpenedModal, setIsOpenedModal] = React.useState(false);

  const openIngredientDetails = (e) => {
    e.stopPropagation();
    setIsOpenedModal(true);
  };
  const closeIngredientDetails = () => {
    setIsOpenedModal(false);
  };

  return (
    <>
      <div
        className={`${styles.item} ml-3 mr-3 pb-8`}
        onClick={openIngredientDetails}
      >
        <img className={`${styles.image} pl-4 pr-4`} src={ingredient.image} alt={ingredient.name} />
        <div className={`${styles.price} pt-1 pb-1`}>
          <p className='text text_type_digits-default pr-2'>{ingredient.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
        <Counter count={1} size='default' />
      </div>

      {isOpenedModal && (
        <Modal closeModal={closeIngredientDetails}>
          <IngredientDetails ingredient={ingredient}/>
        </Modal>
      )}
    </>
  )
}

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientProps.isRequired,
}

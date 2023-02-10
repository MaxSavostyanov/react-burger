import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import styles from './burger-ingredients-item.module.css';
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientProps from '../../untils/prop-types';
import { OPEN_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';

export default function BurgerIngredientsItem({ ingredient }) {
  const dispatch = useDispatch();

  const { bun, fillings } = useSelector(store => store.burgerConstructor);

  const openIngredientDetails = (e) => {
		e.stopPropagation();
    dispatch({
      type: OPEN_INGREDIENT_DETAILS,
      ingredient: ingredient,
    });
  }

  const counter = React.useMemo(() => {
    if (bun && ingredient._id === bun._id) return 2

    else if (fillings.length > 0)
      return fillings.reduce((count, item) => {
        return item._id === ingredient._id ? count += 1 : count;
      }, 0)

    else return 0;
  }, [bun, fillings, ingredient]);

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <div
      className={`${styles.item} ml-3 mr-3 pb-8`}
      onClick={(e) => openIngredientDetails(e, ingredient)}
      style={{ opacity }}
      ref={dragRef}
    >
      <img className={`${styles.image} pl-4 pr-4`} src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.price} pt-1 pb-1`}>
        <p className='text text_type_digits-default pr-2'>{ingredient.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      {!!counter && <Counter count={counter} size='default' />}
    </div>
  )
}

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientProps.isRequired,
}

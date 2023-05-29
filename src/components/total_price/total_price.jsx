import React, { useMemo } from 'react';
import styles from './total_price.module.css';
import {
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


export default function TotalPrice({ orderIngredients }) {
  const totalOrderPrice = useMemo(() => {
    return orderIngredients?.reduce((total, ingredient) => {
      return total += ingredient.price * (ingredient?.type === 'bun' ? 2 : 1);
    }, 0)
  }, [orderIngredients]);

  return (
    <div className={styles.priceContainer}>
      <span className='text text_type_digits-default'>
        {totalOrderPrice}
      </span>
      <CurrencyIcon type='primary' />
    </div>
  );
}

TotalPrice.prototype = {
  orderIngredients: PropTypes.array.isRequired,
};


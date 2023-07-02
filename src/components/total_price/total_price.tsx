import React, { useMemo, FC } from 'react';
import styles from './total_price.module.css';
import {
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types/types';

type TProps = {
  orderIngredients: TIngredient[]; //array
}

const TotalPrice: FC<TProps> = ({ orderIngredients }) => {
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

export default TotalPrice;


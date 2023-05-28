import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-card.module.css';
import { getBurgerIngredients } from '../../services/reducers';

export default function OrderCard({ order, status }) {
  const { ingredients } = useSelector(getBurgerIngredients);

  const orderIngredients = useMemo(() => {
    return order?.ingredients.map((id) => {
      return ingredients?.find((ingredient) => {
        return id === ingredient._id;
      })
    })
  }, [order?.ingredients, ingredients]);


  const totalOrderPrice = useMemo(() => {
    return orderIngredients?.reduce((total, ingredient) => {
      return total += ingredient.price * (ingredient?.type === 'bun' ? 2 : 1);
    }, 0)
  }, [orderIngredients]);

  return (
    <div className={styles.container}>
      <div className={styles.orderID}>
        <p className="text text_type_digits-default">
          #{order.number}
        </p>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.createdAt)}
        />
      </div>

      <div className={styles.title}>
        <h2 className={`${styles.name} text text_type_main-medium`}>
          {order.name}
        </h2>
        {!!status &&
          <p className={`${status === 'done' && styles.statusDone} text text_type_main-default`}>
            {status === 'done' ? 'Выполнен'
              : status === 'pending' ? 'Готовится'
                : status === 'created' ? 'Создан'
                  : 'Выполнен'}
          </p>}
      </div>

      <div className={styles.info}>
        <ul className={styles.ingredientsList}>
          {orderIngredients.map((ingredient, index) => {
            if (index < 5) {
              return (
                <li
                  className={styles.iconItem}
                  key={index}
                  style={{ zIndex: 6 - index }}
                >
                  <img
                    className={styles.icon} s
                    src={ingredient?.image_mobile}
                    alt={ingredient?.name}
                  />
                </li>
              );
            } else if (index === 5) {
              return (
                <li
                  className={styles.iconItem}
                  key={index}
                  style={{ zIndex: 6 - index }}
                >
                  <img
                    className={`${styles.icon} ${styles.lastIcon}`}
                    src={ingredient?.image_mobile}
                    alt={ingredient?.name}
                  />
                  <p
                    className={`${styles.countIcon} text text_type_digits-default`}
                  >
                    {`+${orderIngredients.length - 5}`}
                  </p>
                </li>
              );
            }
            return null;
          })}
        </ul>

        <div className={styles.price}>
          <p className='text text_type_digits-default pr-2'>
            {totalOrderPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>


    </div>
  )
}
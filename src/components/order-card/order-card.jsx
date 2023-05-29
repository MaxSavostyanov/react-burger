import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-card.module.css';
import OrderStatus from '../order-status/order-status';
import TotalPrice from '../total_price/total_price';
import { getBurgerIngredients } from '../../services/reducers';
import { gerOrderIngredients } from '../../untils/functions';
import PropTypes from 'prop-types';

export default function OrderCard({ order, isStatus }) {
  const { ingredients } = useSelector(getBurgerIngredients);

  const orderIngredients = useMemo(() => gerOrderIngredients(order, ingredients), [order, ingredients]);

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
        {!!isStatus && <OrderStatus status={order.status} />}
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

        <TotalPrice orderIngredients={orderIngredients}></TotalPrice>
      </div>


    </div>
  )
}

OrderCard.prototype = {
  order: PropTypes.object.isRequired,
  isStatus: PropTypes.bool,
};
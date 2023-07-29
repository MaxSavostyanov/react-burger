import React, { useMemo, FC } from 'react';
import { useSelector } from '../../services/hooks';
import { Link, useLocation } from 'react-router-dom';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import OrderStatus from '../order-status/order-status';
import TotalPrice from '../total_price/total_price';
import { getBurgerIngredients } from '../../services/reducers';
import { gerOrderIngredients } from '../../untils/functions';
import { TIngredient, TOrder } from '../../services/types/types';

type TProps = {
  order: TOrder,
  isStatus: boolean,
}

const OrderCard: FC<TProps> = ({ order, isStatus }) => {
  const location = useLocation();
  const { ingredients } = useSelector(getBurgerIngredients);

  const orderIngredients = useMemo(() => gerOrderIngredients(order, ingredients), [order, ingredients]);

  return (
    <Link
      to={{ pathname: `/feed/${order._id}` }}
      state={{ background: location }}
      className={styles.link}
      key={order._id}
    >
      <div className={styles.container}>
        <div className={styles.orderID}>
          <p className='text text_type_digits-default'>
            #{order.number}
          </p>
          <FormattedDate
            className='text text_type_main-default text_color_inactive'
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
            {orderIngredients?.map((ingredient, index) => {
              if (index < 5) {
                return (
                  <li
                    className={styles.iconItem}
                    key={index}
                    style={{ zIndex: 6 - index }}
                  >
                    <img
                      className={styles.icon}
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

          <TotalPrice orderIngredients={orderIngredients as TIngredient[]}/>
        </div>
      </div>
    </Link>
  )
}

export default OrderCard;
import React, {useMemo} from 'react';
import { useSelector } from 'react-redux';
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderStatus from '../order-status/order-status';
import TotalPrice from '../total_price/total_price';
import styles from './order-details.module.css';
import { getOrderDetails } from '../../services/reducers';
import { getBurgerIngredients } from '../../services/reducers';
import { gerOrderIngredients } from '../../untils/functions';


export default function OrderDetails(isBackground) {
  const { order } = useSelector(getOrderDetails);
  const { ingredients } = useSelector(getBurgerIngredients);

  const orderIngredients = useMemo(() => gerOrderIngredients(order, ingredients), [order, ingredients]);

  const OrderDetailsElement = ({ container, number }) => {
    return order ? (
      <div className={`${container}`}>
        <p className={`${number} text text_type_digits-large pb-10`}>
          {`#45623`}
        </p>
        <h1 className={`text text_type_main-medium pb-3`}>
          {`Бургер!`}
        </h1>
        <OrderStatus status={order.status}/>

        <h2 className="text text_type_main-medium pt-15 pb-6">
          Состав:
        </h2>
        <ul className={`${styles.ingredients} pr-6`}>
          <li className={styles.ingredient} key={``}>
            <img
              className={styles.image}
              src={''}
              alt={''}
            />
            <p className={`${styles.name} text text_type_main-default`}>
              {''}
            </p>
            <div className={styles.price}>
              <span className="text text_type_digits-default">
                {`.. x ..`}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        </ul>

        <div className={`${styles.footer} pt-10`}>
          <FormattedDate
            className="text text_type_main-default text_color_inactive"
            date={new Date(order.createdAt)}
          />
          <TotalPrice orderIngredients={orderIngredients}/>
        </div>
      </div>
    ) : null;
  }

  return isBackground
    ? <OrderDetailsElement
      container={styles.container}
      number={styles.number} />
    : <OrderDetailsElement
      container={styles.containerRoute}
      number={styles.numberRouter}
    />;
}

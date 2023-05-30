import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderStatus from '../order-status/order-status';
import TotalPrice from '../total_price/total_price';
import styles from './order-details.module.css';
import {
  WS_CONNECTING,
  WS_DISCONNECTING,
} from '../../services/actions/wsActions';
import { URL } from '../../untils/api/api';
import { getBurgerIngredients } from '../../services/reducers';
import { gerOrderIngredients } from '../../untils/functions';
import { getOrdersData } from '../../services/reducers';


export default function OrderDetails({ isBackground }) {
  const dispatch = useDispatch();

  const { ingredients } = useSelector(getBurgerIngredients);
  const { orders, wsConnected } = useSelector(getOrdersData);
  const { id } = useParams();

  React.useEffect(() => {
    dispatch({
      type: WS_CONNECTING,
      payload: `${URL.socket}/all`,
    });

    return () => {
      dispatch({
        type: WS_DISCONNECTING,
      });
    };
  }, [dispatch]);

  const order = orders?.find((item) => item._id === id);
  const orderIngredients = useMemo(() => gerOrderIngredients(order, ingredients), [order, ingredients]);

  const uniqIngredients = order?.ingredients.filter((value, index, array) => array.indexOf(value) === index);
  const getAmount = (id) => {
    return order?.ingredients.reduce((amount, ing) => {
      if (ing === id) amount++;
      return amount;
    }, 0)
  };

  const OrderDetailsElement = ({ container, number }) => {
    return (
      wsConnected && order && (
        <div className={`${container}`}>
          <p className={`${number} text text_type_digits-default pb-10`}>
            {`#${order.number}`}
          </p>
          <h1 className={`text text_type_main-medium pb-3`}>
            {order.name}
          </h1>
          <OrderStatus status={order.status} />

          <h2 className='text text_type_main-medium pt-15 pb-6'>
            Состав:
          </h2>
          <ul className={`${styles.ingredients} pr-6`}>
            {uniqIngredients.map((id) => {
              const ingredient = ingredients.find((item) => item._id === id);
              return (
                <li className={styles.ingredient} key={ingredient._id}>
                  <div className={styles.name}>
                    <img
                      className={`${styles.image}`}
                      src={ingredient.image_mobile}
                      alt={ingredient.name}
                    />
                    <p className={`text text_type_main-default pl-4`}>
                      {ingredient.name}
                    </p>
                  </div>
                  <div className={styles.price}>
                    <span className='text text_type_digits-default'>
                      {`${getAmount(id)} x ${ingredient.price}`}
                    </span>
                    <CurrencyIcon type='primary' />
                  </div>
                </li>
              )
            })}
          </ul>

          <div className={`${styles.footer} pt-10`}>
            <FormattedDate
              className='text text_type_main-default text_color_inactive'
              date={new Date(order.createdAt)}
            />
            <TotalPrice orderIngredients={orderIngredients} />
          </div>
        </div>
      ));
  }

  return isBackground
    ? <OrderDetailsElement
      container={styles.container}
      number={styles.number} />
    : <OrderDetailsElement
      container={styles.containerRoute}
      number={styles.numberRoute}
    />;
}

import { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  WS_CONNECTING,
  WS_DISCONNECTING,
} from '../../services/constants/ws';
import { URL } from '../../untils/api/api';
import OrderList from '../../components/order-list/order-list';
import OrderStats from '../../components/order-stats/order-stats';
import styles from './feed.module.css';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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

  return (
    <div className={`${styles.container} pt-10`}>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Лента заказов
      </h1>

      <div className={`${styles.columns} pt-5`}>
        <div className={`${styles.columnRight} mr-15`}>
          <OrderList allOrders></OrderList>
        </div>

        <div className={`${styles.columnLeft}`}>
          <OrderStats></OrderStats>
        </div>
      </div>
    </div>
  )
}
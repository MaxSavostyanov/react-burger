import React, { useMemo, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderCard from '../order-card/order-card';
import styles from './order-list.module.css';
import {
  WS_CONNECTING,
  WS_DISCONNECTING,
} from '../../services/actions/wsActions';
import { URL } from '../../untils/api/api';
import { getCookie } from '../../untils/cookie/cookie';
import { getOrdersData } from '../../services/reducers';
import { TOrder } from '../../untils/types';

type TProps = {
  allOrders: boolean;
}

const OrderList: FC<TProps> = ({ allOrders }) => {
  const dispatch = useDispatch();

  const { orders } = useSelector(getOrdersData);
  const myOrders = useMemo(() => [...orders]?.reverse(), [orders]);

  let token = getCookie('accessToken')?.split(' ')[1];

  React.useEffect(() => {
    if (allOrders) {
      dispatch({
        type: WS_CONNECTING,
        payload: `${URL.socket}/all`,
      });
    } else {
      dispatch({
        type: WS_CONNECTING,
        payload: `${URL.socket}?token=${token}`,
      });
    }
    return () => {
      dispatch({
        type: WS_DISCONNECTING,
      });
    };
  }, [dispatch, token, allOrders]);

  return (
    <div className={`${styles.container} pr-2`}>
      {
        allOrders
          ? orders?.map((order: TOrder) => (
            <OrderCard order={order} isStatus={false} key={order._id} />
          ))
          : myOrders.map((order) => (
            <OrderCard order={order} isStatus={true} key={order._id} />
          ))
      }
    </div >
  )
}

export default OrderList;
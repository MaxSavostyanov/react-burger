import React from 'react';
import { useSelector } from 'react-redux';
import OrderCard from '../order-card/order-card';
import styles from './order-list.module.css';
import { getOrdersData } from '../../services/reducers';


export default function OrderList(allOrders) {
  const { orders } = useSelector(getOrdersData);

  return (
    <div className={`${styles.container} pr-2`}>
      {orders?.map((order) => (
        <OrderCard order={order} isStatus={false} />
      ))}
    </div >
  )
}
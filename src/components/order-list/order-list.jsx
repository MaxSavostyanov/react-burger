import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import OrderCard from '../order-card/order-card';
import styles from './order-list.module.css';


export default function OrderList() {
  const location = useLocation();

  const { orders } = [];

  return (
    <div className={`${styles.container} pr-2`}>
      {orders && orders.map((order) => {
        return (
          <Link
            to={{ pathname: `/feed/${order._id}`, state: { background: location } }}
            className={styles.link} key={order._id}
          >
            <OrderCard order={order} status={false} />
          </Link>
        )
      })}
    </div >
  )
}
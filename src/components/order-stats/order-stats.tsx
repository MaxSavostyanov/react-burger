import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';
import styles from './order-stats.module.css';
import { getOrdersData } from '../../services/reducers';
import { TOrder } from '../../services/types/types';

const OrderStats: FC = () => {
  const { orders, total, totalToday } = useSelector(getOrdersData);

  const isDone = orders.filter((order: TOrder) => order.status === 'done').filter((order: TOrder, index: number) => index <= 17);
  const inProgress = orders.filter((order: TOrder) => order.status !== 'done').filter((order: TOrder, index: number) => index <= 17);

  return (
    <div className={styles.container}>
      <div className={styles.orderBoard}>
        <div className={`${styles.column} pr-9`}>
          <h3 className='text text_type_main-medium pb-6'>
            Готовы:
          </h3>
          <ul className={`${styles.orderList}`}>
            {isDone.map((order: TOrder) => {
              return (
                <li
                  className={`${styles.orderItem} ${styles.orderItemDone} text text_type_digits-default`}
                  key={'done' + order._id}
                >
                  {order.number}
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className='text text_type_main-medium pb-6'>
            В работе:
          </h3>
          <ul className={`${styles.orderList}`}>
            {inProgress.map((order: TOrder, index: number) => {
              return (
                <li
                  className={`${styles.orderItem} text text_type_digits-default`}
                  key={'progress' + order._id}
                >
                  {order.number}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className={`${styles.completed} pt-15`}>
        <h3 className='text text_type_main-medium'>
          Выполнено за все время:
        </h3>
        <p className={`${styles.totalOrders} text text_type_digits-large`}>
          {total}
        </p>
      </div>

      <div className={`${styles.completed} pt-15`}>
        <h3 className='text text_type_main-medium'>
          Выполнено за сегодня:
        </h3>
        <p className={`${styles.totalItems} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </div>
  )
}

export default OrderStats;
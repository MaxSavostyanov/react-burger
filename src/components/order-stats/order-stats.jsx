
import { useSelector } from 'react-redux';
import styles from './order-stats.module.css';
import { getOrdersData } from '../../services/reducers';

export default function OrderStats() {
  const { orders, total, totalToday } = useSelector(getOrdersData);

  const isDone = orders.filter(order => order.status === 'done').filter((order, index) => index <= 20);
  const inProgress = orders.filter(order => order.status !== 'done').filter((order, index) => index <= 20);

  return (
    <div className={styles.container}>
      <div className={styles.orderBoard}>
        <div className={`${styles.column} pr-9`}>
          <h3 className='text text_type_main-medium pb-6'>
            Готовы:
          </h3>
          <ul className={`${styles.orderList}`}>
            {isDone.map((order) => {
              return (
                <li
                  className={`${styles.orderItem} ${styles.orderItemDone} text text_type_digits-default`}
                  key={order._id}
                >
                  {order.number}
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className='text text_type_main-medium'>
            В работе:
          </h3>
          <ul className={`${styles.orderList} pt-6`}>
            {inProgress.map((order) => {
              return (
                <li
                  className={`${styles.orderItem} text text_type_digits-default`}
                  key={order._id}
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
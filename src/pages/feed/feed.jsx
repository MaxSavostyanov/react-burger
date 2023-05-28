
import OrderList from '../../components/order-list/order-list';
import OrderStats from '../../components/order-stats/order-stats';
import styles from './feed.module.css';

export const Feed = () => {

  return (
    <div className={`${styles.container} pt-10`}>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Лента заказов
      </h1>

      <div className={`${styles.columns} pt-5`}>
        <OrderList></OrderList>
        <OrderStats></OrderStats>
      </div>
    </div>
  )
}
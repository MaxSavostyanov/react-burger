import React from 'react';
import { useSelector } from 'react-redux';
import styles from './order-accept.module.css';
import icon from '../../images/icon-done.svg';
import { getOrderAccept } from '../../services/reducers';

export default function OrderAccept() {
  const { order } = useSelector(getOrderAccept);

  return order?.order
    ? (
      <div className={`${styles.container} pt-20 pb-20`}>
        <h1 className='text text_type_digits-large pb-8'>
          {order.order.number}
        </h1>
        <p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
        <img className={`${styles.icon} pb-15`} src={icon as unknown as string} alt='Заказ принят' />
        <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
      </div>
    )
    : (
      <div className={styles.preloader}>
        <i className={styles.preloaderСircle}></i>
        <p className='text text_type_main-medium pt-3'>Загрузка...</p>
      </div>
    )
}
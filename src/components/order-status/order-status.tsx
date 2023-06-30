import React, {FC} from 'react';
import styles from './order-status.module.css';

type TProps = {
  status: string;
}

const OrderStatus: FC<TProps> = ({ status }) => {
  let statusStyle = (status === 'done') ? styles.statusDone : 'null';
  let statusText = status === 'done' ? 'Выполнен'
    : status === 'pending' ? 'Готовится'
      : status === 'created' ? 'Создан'
        : 'Выполнен';

  return (
    <>
      <p className={`${statusStyle} text text_type_main-default`}>
        {statusText}
      </p>
    </>
  )
}

export default OrderStatus;
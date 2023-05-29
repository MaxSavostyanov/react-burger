import styles from './order-status.module.css';
import PropTypes from 'prop-types';

export default function OrderStatus({ status }) {
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

OrderStatus.prototype = {
  status: PropTypes.string.isRequired,
};
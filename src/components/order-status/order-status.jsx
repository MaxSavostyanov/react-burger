import styles from './order-status.module.css';
import PropTypes from 'prop-types';

export default function OrderStatus(status) {
  return (
    <>
      <p className={`${status === 'done' && styles.statusDone} text text_type_main-default`}>
        {status === 'done' ? 'Выполнен'
          : status === 'pending' ? 'Готовится'
            : status === 'created' ? 'Создан'
              : 'Выполнен'}
      </p>
    </>
  )
}

OrderStatus.prototype = {
  status: PropTypes.string.isRequired,
};
import React from 'react';
import {
  createPortal
} from 'react-dom';
import PropTypes from 'prop-types';
import {
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default function Modal({
  closeModal,
  children
}) {
  function handleEcsClose(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleEcsClose);


    return () => {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', handleEcsClose);
    }
  });

  return createPortal(
    <ModalOverlay>
      <div
        className={`${styles.container} pt-10 pr-10 pb-10 pl-10`}
        onClick={e => e.stopPropagation()}
      >
        {children}

        <button className={`${styles.close} mt-15 mr-10`} >
          <CloseIcon type='primary' onClick={closeModal} />
        </button>
      </div>
    </ModalOverlay>,
    modalRoot
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

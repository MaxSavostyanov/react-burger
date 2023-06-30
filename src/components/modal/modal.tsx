import React, { FC, ReactNode } from 'react';
import {
  createPortal
} from 'react-dom';
import {
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

type TProps = {
  closeModal: () => void,
  children: ReactNode,
}

const Modal: FC<TProps> = ({ closeModal, children }) => {
  const handleEcsClose = (e: { key: string }): void => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEcsClose);

    return () => {
      document.removeEventListener('keydown', handleEcsClose);
    }
  });

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
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

export default Modal;

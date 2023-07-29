import React, { FC, ReactNode } from 'react';
import styles from './modal-overlay.module.css';

type TProps = {
  closeModal: () => void,
  children: ReactNode,
}

const ModalOverlay: FC<TProps> = ({ children, closeModal }) => {
  return (
    <div
      className={styles.overlay}
      onClick={closeModal}>
      {children}
    </div>
  );
}

export default ModalOverlay;
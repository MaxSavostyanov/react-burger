import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
}
  from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.container} pt-4 pb-4`}>
        <div className={`${styles.btns} ${styles.btns_left}`}>
          <a href='#constructor' className={`${styles.btn} ${styles.btn_active} pt-4 pb-4 pr-5 pl-5 mr-2`}>
            <BurgerIcon type="primary" />
            <p className='text text_type_main-default pl-2'>Конструктор</p>
          </a>
          <a href='#ordersList' className={`${styles.btn} pt-4 pb-4 pr-5 pl-5 mr-2`}>
            <ListIcon type="secondary" />
            <p className='text text_type_main-default pl-2'>Лента заказов</p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={`${styles.btns} ${styles.btns_right}`}>
          <a href='#account' className={`${styles.btn} pt-4 pb-4 pr-5 pl-5 ml-2`}>
            <ProfileIcon type="secondary" />
            <p className='text text_type_main-default pl-2'>Личный кабинет</p>
          </a>
        </div>
      </nav>
    </header>
  )
}
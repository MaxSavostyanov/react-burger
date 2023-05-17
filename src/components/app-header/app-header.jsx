import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
}
  from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
import { useSelector } from 'react-redux';
import { getAuthData } from '../../services/reducers';

export default function AppHeader() {
  const { pathname } = useLocation();
  const { userData } = useSelector(getAuthData);

  return (
    <header className={styles.header}>
      <nav className={`${styles.container} pt-4 pb-4`}>
        <div className={`${styles.btns} ${styles.btns_left}`}>
          <NavLink
            to='/'
            className={({ isActive }) => `${styles.btn} pt-4 pb-4 pr-5 pl-5 ${isActive ? styles.btn_active : ''}`}
            activeClassName={`${styles.btn_active}`}
          >
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default pl-2'>
              Конструктор
            </p>
          </NavLink>

          <NavLink
            to='/feed'
            className={({ isActive }) => `${styles.btn} pt-4 pb-4 pr-5 pl-5 ${isActive ? styles.btn_active : ''}`}
            activeClassName={`${styles.btn_active}`}
          >
            <ListIcon type={pathname === '/profile/orders' ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default pl-2'>
              Лента заказов
            </p>
          </NavLink>

        </div>

        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={`${styles.btns} ${styles.btns_right}`}>
          <NavLink
            to='/profile'
            className={({ isActive }) => `${styles.btn} pt-4 pb-4 pr-5 pl-5 ${isActive ? styles.btn_active : ''}`}
          >
            <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default pl-2'>
              {userData ? `${userData.user.name}` : 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

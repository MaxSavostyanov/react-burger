import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';

export const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeName = e => {
    setName(e.target.value);
  }

  const onChangeEmail = e => {
    setEmail(e.target.value);
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  return (
    <div className={`${styles.container} pt-30 pl-10`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to='/profile'
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={`${styles.linkActive} text text_type_main-medium`}
            >
              Профиль
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink
              to='/profile/orders'
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={`${styles.linkActive} text text_type_main-medium`}
            >
              История заказов
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink
              to='/'
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={`${styles.linkActive} text text_type_main-medium`}
            >
              Выход
            </NavLink>
          </li>
        </ul>

        <p className={`${styles.text} text text_type_main-default text_color_inactive pt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <form className={`${styles.form} pl-15`}>
        <div className="pb-6">
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChangeName}
            icon={'EditIcon'}
            value={name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <div className="pb-6">
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={onChangeEmail}
            icon={'EditIcon'}
            value={email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <div className="pb-6">
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={onChangePassword}
            icon={'EditIcon'}
            value={password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
      </form>
    </div >
  )
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [checkСode, setCheckСode] = useState('');

  const onChangeCodeMail = e => {
    setCheckСode(e.target.value)
  }

  const onChangePassword = e => {
    setPassword(e.target.value);
  }


  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>

      <form className={`${styles.form} pb-20`}>
        <div className="pb-6">
          <PasswordInput
            placeholder={'Введите новый пароль'}
            onChange={onChangePassword}
            value={password}
            name={'password'}
            size="default"
          />
        </div>

        <div className="pb-6">
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChangeCodeMail}
            value={checkСode}
            name={'checkСode'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive pb-4">
        Уже зарегистрированы?
        <Link
          className={`${styles.link} pl-2`}
          to='/login'>
          Войти
        </Link>
      </p>
    </div >)
}

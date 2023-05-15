
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  }

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>Регистрация</h2>

      <form className={`${styles.form} pb-20`}>
        <div className="pb-6">
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={onChangeEmail}
            value={email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      
      <p className="text text_type_main-default text_color_inactive pb-4">
        Вспомнили пароль?
        <Link
          className={`${styles.link} pl-2`}
          to='/login'>
          Войти
        </Link>
      </p>
    </div >)
}
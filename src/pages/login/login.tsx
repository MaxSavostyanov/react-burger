import { useState, FC } from 'react';
import { useDispatch } from '../../services/hooks';
import { Link } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { logIn } from '../../services/actions/auth';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logIn(form));
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>Вход</h2>

      <form className={`${styles.form} pb-20`} onSubmit={onSubmit}>
        <div className='pb-6'>
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={'email'}
            size='default'
          />
        </div>

        <div className='pb-6'>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={'password'}
            size='default'
          />
        </div>

        <Button htmlType='submit' type='primary' size='medium'>
          Войти
        </Button>
      </form>

      <p className='text text_type_main-default text_color_inactive pb-4'>
        Вы — новый пользователь?
        <Link
          className={`${styles.link} pl-2`}
          to='/register'>
          Зарегистрироваться
        </Link>
      </p>

      <p className='text text_type_main-default text_color_inactive'>
        Забыли пароль?
        <Link
          className={`${styles.link} pl-2`}
          to='/forgot-password'>
          Восстановить пароль
        </Link>
      </p>
    </div>
  )
}
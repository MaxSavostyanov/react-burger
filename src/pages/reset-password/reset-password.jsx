import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { setNewPassword } from '../../services/actions/auth';
import { getAuthData } from '../../services/reducers';

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isReset } = useSelector(getAuthData);
  console.log(isReset);

  const [form, setValue] = useState({ password: '', token: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setNewPassword(form, navigate));
  };


  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>

      <form className={`${styles.form} pb-20`} onSubmit={onSubmit}>
        <div className='pb-6'>
          <PasswordInput
            placeholder={'Введите новый пароль'}
            onChange={onChange}
            value={form.password}
            name={'password'}
            size='default'
          />
        </div>

        <div className='pb-6'>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChange}
            value={form.token}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <Button type='primary' size='medium'>
          Сохранить
        </Button>
      </form>

      <p className='text text_type_main-default text_color_inactive pb-4'>
        Уже зарегистрированы?
        <Link
          className={`${styles.link} pl-2`}
          to='/login'>
          Войти
        </Link>
      </p>
    </div >)
}

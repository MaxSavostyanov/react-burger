import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';

export const Register = () => {
  const [name, setName] = useState('');
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
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>Регистрация</h2>

      <form className={`${styles.form} pb-20`}>
        <div className="pb-6">
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChangeName}
            value={name}
            name={'name'}
            error={false}
            size={'default'}
          />
        </div>

        <div className="pb-6">
          <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={'email'}
            size="default" />
        </div>

        <div className="pb-6">
          <PasswordInput
            onChange={onChangePassword}
            value={password}
            name={'password'}
            size="default" />
        </div>

        <Button type="primary" size="medium">
          Зарегистрироваться
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
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';
import {
  IS_CHANGED,
  STOP_CHANGE,
  setChangedUser,
} from '../../services/actions/auth';
import { getAuthData } from '../../services/reducers';

export default function ProfileForm(){
  const dispatch = useDispatch();

  const { userData, isChanged } = useSelector(getAuthData);
  const name = userData.user.name;
  const email = userData.user.email;

  const [change, setChange] = useState({ name: name, email: email, password: '' });

  const onChange = (e) => {
    dispatch({ type: IS_CHANGED });
    setChange({ ...change, [e.target.name]: e.target.value });
  };

  const onResetChanges = () => {
    setChange({ name: name, email: email, password: '' });
    dispatch({ type: STOP_CHANGE });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setChangedUser(change));
    setChange({ ...change, password: '' });
    dispatch({ type: STOP_CHANGE });
  };

  return (
    <form className={`${styles.form} pl-15`} onSubmit={onSubmit}>
      <div className='pb-6'>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          icon={'EditIcon'}
          value={change.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>

      <div className='pb-6'>
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={onChange}
          icon={'EditIcon'}
          value={change.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>

      <div className='pb-6'>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={onChange}
          icon={'EditIcon'}
          value={change.password}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>

      {isChanged && (
        <div>
          <Button
            htmlType='submit'
            type='primary'
            size='medium'
          >
            Сохранить
          </Button>

          <Button
            onClick={onResetChanges}
            htmlType='button'
            type='secondary'
            size='medium'
          >
            Отмена
          </Button>
        </div>
      )}
    </form>
  )
}

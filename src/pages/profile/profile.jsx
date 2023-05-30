
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './profile.module.css';
import {
  logOut,
} from '../../services/actions/auth';
import OrderList from '../../components/order-list/order-list';
import ProfileForm from '../../components/profile-form/profile-form';

export const Profile = ({isOrders = false}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut(navigate));
  };

  return (
    <div className={`${styles.container} pt-30 pl-10`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to='/profile'
              end
              className={({ isActive }) => `${styles.link} text text_type_main-medium text_color_inactive ${isActive ? styles.linkActive : ''}`}
            >
              Профиль
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink
              to='/profile/orders'
              end
              className={({ isActive }) => `${styles.link} text text_type_main-medium text_color_inactive ${isActive ? styles.linkActive : ''}`}
            >
              История заказов
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink
              to='/'
              onClick={handleLogout}
              className={({ isActive }) => `${styles.link} text text_type_main-medium text_color_inactive ${isActive ? styles.linkActive : ''}`}
            >
              Выход
            </NavLink>
          </li>
        </ul>

        <p className={`${styles.text} text text_type_main-default text_color_inactive pt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <div className={`${styles.content} pl-15`}>
        {!!isOrders
        ? <OrderList />
        : <ProfileForm />
        }
      </div>
    </div >
  )
}

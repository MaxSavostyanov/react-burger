import React from 'react';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { ProtectedRoute } from '../protected-route/protected-route';
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  NotFound404,
} from '../../pages/index'
import { getUserData, checkAuth } from '../../services/actions/auth';

export default function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkAuth());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<NotFound404 />} />}
        />
        <Route
          path='/profile/orders/:id'
          element={<ProtectedRoute element={<NotFound404 />} />}
        />
        <Route
          path='/feed'
          element={<ProtectedRoute element={<NotFound404 />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

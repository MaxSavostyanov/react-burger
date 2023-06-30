import React from 'react';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details'; import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { ProtectedRoute } from '../protected-route/protected-route';
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Feed,
  NotFound404,
} from '../../pages/index'
import { checkAuth } from '../../services/actions/auth';


export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(-1);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        } />

        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth={true} element={<Login />} />}
        />

        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth={true} element={<Register />} />}
        />

        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth={true} element={<ForgotPassword />} />}
        />

        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth={true} element={<ResetPassword />} />}
        />

        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />

        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<Profile isOrders={true} />} />}
        />

        <Route
          path='/profile/orders/:id'
          element={<ProtectedRoute element={<OrderDetails />} />}
        />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:id' element={<OrderDetails />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal closeModal={handleCloseModal}>
                <IngredientDetails isBackground />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:id'
            element={
              <Modal closeModal={handleCloseModal}>
                <OrderDetails isBackground />
              </Modal>
            }
          />

          <Route
            path='/feed/:id'
            element={
              <Modal closeModal={handleCloseModal}>
                <OrderDetails isBackground />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

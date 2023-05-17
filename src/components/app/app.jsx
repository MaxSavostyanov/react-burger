import React from 'react';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
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
import { checkAuth } from '../../services/actions/auth';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getBurgerIngredients());
    console.log('ing получены');
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleCloseModal = (e) => {
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
          element={<ProtectedRoute element={<NotFound404 />} />}
        />

        <Route
          path='/profile/orders/:id'
          element={<ProtectedRoute element={<NotFound404 />} />}
        />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<NotFound404 />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' closeModal={handleCloseModal}>
                <IngredientDetails isBackground />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

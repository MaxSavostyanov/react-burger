import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {
  getProductData,
  getOrderData,
} from '../api/api';
import {
  DataContext,
  OrderContext
} from '../../contexts/appContext';

export default function App() {
  const [data, setData] = React.useState([]);
  const [order, setOrder] = React.useState({
    name: '',
    order: {
      number: ''
    },
    success: false
  });

  function getOrder(ids) {
    getOrderData(ids)
      .then(res => setOrder(res))
      .catch(e => console.log(`Упс, ошибка! ${e}`))
  }

  React.useEffect(() => {
    getProductData()
      .then(res => setData(res.data))
      .catch(e => console.log(`Упс, ошибка! ${e}`))
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <OrderContext.Provider value={{ order, getOrder }}>
        <div className={styles.app}>
          <AppHeader />
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </div>
      </OrderContext.Provider>
    </DataContext.Provider>
  );
}

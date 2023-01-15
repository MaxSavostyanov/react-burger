import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import getProductData from '../api/api';

export default function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getProductData()
      .then(res => setData(res.data))
      .catch(e => console.log(`Упс, ошибка! ${e}`))
  },
  []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

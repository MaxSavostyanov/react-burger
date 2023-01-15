import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-tabs.module.css';


export default function BurgerIngredientsTabs() {
  const [current, setCurrent] = React.useState('bun');

  return (
    <div className={`${styles.tabs} pt-5 pb-10`}>
      <a href='#bun' className={styles.link}>
        <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
      </a>
      <a href='#sauce' className={styles.link}>
        <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
      </a>
      <a href='#main' className={styles.link}>
        <Tab value='main' active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </a>
    </div>
  )
}

import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-tabs.module.css';

type TProps = {
  inViews: {
    bunInView: boolean,
    sauceInView: boolean,
    mainInView: boolean
  }
}

const BurgerIngredientsTabs: FC<TProps> = (props) => {
  const [current, setCurrent] = React.useState('bun');
  const { bunInView, sauceInView, mainInView } = props.inViews;

  React.useEffect(() => {
    if (bunInView) setCurrent('bun')
    else if (sauceInView) setCurrent('sauce')
    else if (mainInView) setCurrent('main')
  }, [bunInView, sauceInView, mainInView]);

  return (
    <div className={`${styles.tabs} pt-5 pb-10`}>
      <a href='#bun' className={styles.link}>
        <Tab
          value='bun'
          active={current === 'bun'}
          onClick={() => setCurrent('bun')}
        >
          Булки
        </Tab>
      </a>
      <a href='#sauce' className={styles.link}>
        <Tab
          value='sauce'
          active={current === 'sauce'}
          onClick={() => setCurrent('sauce')}
        >
          Соусы
        </Tab>
      </a>
      <a href='#main' className={styles.link}>
        <Tab
          value='main'
          active={current === 'main'}
          onClick={() => setCurrent('main')}
        >
          Начинки
        </Tab>
      </a>
    </div>
  )
}

export default BurgerIngredientsTabs;
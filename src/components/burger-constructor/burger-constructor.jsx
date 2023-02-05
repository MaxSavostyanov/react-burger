import React from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
}
  from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorFilling from '../burger-constructor-filling/burger-constructor-filling'
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { DataContext, OrderContext } from '../../contexts/appContext';


export default function BurgerConstructor() {
  const { data } = React.useContext(DataContext);
  const { getOrder } = React.useContext(OrderContext);

  const bun = React.useMemo(() => data.find((item) => item.type === 'bun'), [data]);
  const fillings = React.useMemo(() => data.filter((item) => item.type !== 'bun' && Math.round(Math.random())), [data]);

  const getBurgerIDs = () => {
    const ids = fillings.map(filling => filling._id);
    ids.push(bun._id);
    return ids;
  };

  const [totalPrice, setTotalPrice] = React.useState(0);
  React.useEffect(() => {
    const totalPrice = fillings.reduce((sum, item) => sum + item.price, bun ? (bun.price * 2) : 0);
    setTotalPrice(totalPrice);
  }, [bun, fillings]);

  const [isOpenedModal, setIsOpenedModal] = React.useState(false);

  const openOrderDetails = (e) => {
    e.stopPropagation();
    setIsOpenedModal(true);
  };

  const closeOrderDetails = () => {
    setIsOpenedModal(false);
  };

  return (
    <section className={`${styles.section} pl-5 pt-25 pr-5`}>
      <div className={`${styles.container} pl-4`}>
        <div className='pr-4 pb-4 pl-8'>
          {bun && <ConstructorElement
            type='top'
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </div>

        <ul className={`${styles.list}`}>
          {fillings.map((ingredient) => {
            return ingredient
              ? (<ConstructorFilling
                key={ingredient._id}
                ingredient={ingredient}
              />)
              : null;
          })}
        </ul>

        <div className='pt-4 pr-4 pl-8'>
          {bun && <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </div>

      </div>

      <div className={`${styles.order} pt-10 pr-4`}>
        <div className={`${styles.result} pr-10`}>
          <p className='text text_type_digits-medium pr-2'>{totalPrice}</p>
          <div className={`${styles.currencyIcon}`}>
            <CurrencyIcon type='primary' />
          </div>
        </div>

        <Button
          htmlType='button'
          type='primary'
          size='large'
          onClick={(e) => {
            getOrder(getBurgerIDs());
            openOrderDetails(e);
          }}
        >
          Оформить заказ
        </Button>
      </div>

      {isOpenedModal && (
        <Modal closeModal={closeOrderDetails}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}

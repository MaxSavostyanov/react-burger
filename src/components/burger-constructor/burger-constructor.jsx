import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
}
  from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorFilling from '../burger-constructor-filling/burger-constructor-filling'
import styles from './burger-constructor.module.css';
import ingredientProps from '../../untils/prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';


export default function BurgerConstructor({ data }) {
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
          <ConstructorElement
            type='top'
            isLocked={true}
            text='Краторная булка N-200i (верх)'
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </div>

        <ul className={`${styles.list}`}>
          {data.map((ingredient) => {
            if (ingredient.type === 'sauce' || ingredient.type === 'main') {
              return <ConstructorFilling key={ingredient._id} ingredient={ingredient} />
            }
            return null
          })}
        </ul>

        <div className='pt-4 pr-4 pl-8'>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text='Краторная булка N-200i (низ)'
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </div>
      </div>

      <div className={`${styles.order} pt-10 pr-4`}>
        <div className={`${styles.result} pr-10`}>
          <p className='text text_type_digits-medium pr-2'>{data.reduce((result, ingredient) => result + ingredient.price, 0)}</p>
          <div className={`${styles.currencyIcon}`}>
            <CurrencyIcon type='primary' />
          </div>
        </div>

        <Button
          htmlType='button'
          type='primary'
          size='large'
          onClick={openOrderDetails}
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientProps).isRequired,
}

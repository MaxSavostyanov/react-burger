import React from 'react';
import styles from './order-details.module.css'
import icon from '../../images/icon-done.svg'

export default function OrderDetails() {
	return (
		<div className={`${styles.container} pt-20 pb-20`}>
			<h1 className='text text_type_digits-large pb-8'>
				{Math.random().toString().slice(2, 8)}
			</h1>
			<p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
			<img className={`${styles.icon} pb-15`} src={icon} alt='Заказ принят' />
			<p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
		</div>
	)
}

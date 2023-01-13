import React from 'react';
import PropTypes from 'prop-types';
import constructorItemStyles from './burger-constructor-filling.module.css'
import {
	DragIcon,
	ConstructorElement
}
	from '@ya.praktikum/react-developer-burger-ui-components';

  export default function ConstructorFilling({ item }) {
	return (
		<li className={`${constructorItemStyles.filling} pt-4 pr-2`}>
			<DragIcon type="primary" />
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image}
			/>
		</li>
	)
}

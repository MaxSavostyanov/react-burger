import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor-filling.module.css'
import {
	DragIcon,
	ConstructorElement
}
	from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientProps from '../../untils/prop-types';

  export default function ConstructorFilling({ ingredient }) {
	return (
		<li className={`${styles.filling} pt-4 pr-2`}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
			/>
		</li>
	)
}

ConstructorFilling.propTypes = {
  ingredient: ingredientProps.isRequired,
}

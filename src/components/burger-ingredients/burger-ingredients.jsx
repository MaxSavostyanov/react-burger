import React from 'react';
import PropTypes from "prop-types";
import styles from './burger-ingredients.module.css';
import Tabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import Category from '../burger-ingredients-category/burger-ingredients-category';
import { ingredientProps } from '../../untils/prop-types';

export default function BurgerIngredients({ data }) {
	return (
		<section className={`${styles.section} pl-5 pr-5`}>
			<h1 className='text text_type_main-large pt-10'>Соберите бургер</h1>
			<Tabs />
			<ul className={`${styles.list} pt-8`}>
				<Category className='pt-5' type='bun' data={data} />
				<Category className='pt-5' type='sauce' data={data} />
				<Category className='pt-5' type='main' data={data} />
			</ul>
		</section >
	)
}

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(ingredientProps).isRequired,
}




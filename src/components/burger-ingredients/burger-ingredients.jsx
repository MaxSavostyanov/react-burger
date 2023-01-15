import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import Tabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import Category from '../burger-ingredients-category/burger-ingredients-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ingredientProps from '../../untils/prop-types';

export default function BurgerIngredients({ data }) {
	const [isOpenedModal, setIsOpenedModal] = React.useState(false);
	const [ingredient, setIngredient] = React.useState(null);

	const openIngredientDetails = (e, ingredient) => {
		e.stopPropagation();
		setIsOpenedModal(true);
		setIngredient(ingredient);
	};
	const closeIngredientDetails = () => {
		setIsOpenedModal(false);
	};

	return (
		<section className={`${styles.section} pl-5 pr-5`}>
			<h1 className='text text_type_main-large pt-10'>
				Соберите бургер
			</h1>

			<Tabs />

			<ul className={`${styles.list}`}>
				<Category
					className='pt-5'
					type='bun'
					data={data}
					openIngredientDetails={openIngredientDetails}
				/>
				<Category
					className='pt-5'
					type='sauce'
					data={data}
					openIngredientDetails={openIngredientDetails}
				/>
				<Category
					className='pt-5'
					type='main'
					data={data}
					openIngredientDetails={openIngredientDetails}
				/>
			</ul>


			{isOpenedModal && (
				<Modal closeModal={closeIngredientDetails}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</section >
	)
}

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(ingredientProps).isRequired,
}

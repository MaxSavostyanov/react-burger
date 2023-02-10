import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import styles from './burger-ingredients.module.css';
import Tabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import Category from '../burger-ingredients-category/burger-ingredients-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CLOSE_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';

export default function BurgerIngredients() {
	const dispatch = useDispatch();
	const { openIngredient } = useSelector(store => store.ingredientDetails);

	const closeIngredientDetails = () => {
		dispatch({
			type: CLOSE_INGREDIENT_DETAILS,
		});
	};

	const [bunRef, bunInView] = useInView({ threshold: .05 });
	const [sauceRef, sauceInView] = useInView({ threshold: .05 });
	const [mainRef, mainInView] = useInView({ threshold: .05 });

	return (
		<section className={`${styles.section} pl-5 pr-5`}>
			<h1 className='text text_type_main-large pt-10'>
				Соберите бургер
			</h1>

			<Tabs inViews={{ bunInView, sauceInView, mainInView }} />

			<ul className={`${styles.list}`}>
				<div ref={bunRef}>
					<Category
						className='pt-5'
						type='bun'
					/>
				</div>

				<div ref={sauceRef}>
					<Category
						className='pt-5'
						type='sauce'
					/>
				</div>

				<div ref={mainRef}>
					<Category
						className='pt-5'
						type='main'
					/>
				</div>
			</ul>

			{!!openIngredient && (
				<Modal closeModal={closeIngredientDetails}>
					<IngredientDetails ingredient={openIngredient} />
				</Modal>
			)}
		</section >
	)
}

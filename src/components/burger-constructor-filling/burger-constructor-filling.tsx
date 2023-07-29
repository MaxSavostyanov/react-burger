import React, { FC } from 'react';
import { useDispatch } from '../../services/hooks';
import { useDrag, useDrop } from 'react-dnd';
import styles from './burger-constructor-filling.module.css'
import {
  DragIcon,
  ConstructorElement
}
  from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types/types';
import { DELETE_FILLING, SWAP_FILLING } from '../../services/constants/burger-constructor';

type TConstructorIngredient = {
  ingredient: TIngredient;
  index: number;
}

type TDragItem = {
  index: number;
  id: string;
  type: string;
};

const ConstructorFilling: FC<TConstructorIngredient> = ({ ingredient, index }) => {
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const onDelete = () => {
    dispatch({
      type: DELETE_FILLING,
      filling: ingredient,
    });
  };

  const [{ opacity }, drag] = useDrag({
    type: "filling",
    item: { id: ingredient.id, index },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
  });

  const [, drop] = useDrop<TDragItem>({
    accept: "filling",
    hover(ingredient) {
      if (!ref.current) {
        return;
      }
      const dragIndex = ingredient.index;
      const dropIndex = index;
      dispatch({
        type: SWAP_FILLING,
        dragIndex,
        dropIndex,
      });
      ingredient.index = dropIndex;
    },
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={`${styles.filling} pt-4 pr-2`}
      style={{ opacity }}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={(() => onDelete())}
      />
    </li>
  )
}

export default ConstructorFilling;

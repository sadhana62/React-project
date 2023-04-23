import { useContext } from 'react';
import classes from './MealItems.module.css';
import MealForm from './MealForm';
import CartContext from '../../../store/Cart-context';

const MealItems = (props)=>{
    const cartCtx = useContext(CartContext);
    const price = props.price.toFixed(2);
    const addItemHandler = (amount)=>{
        cartCtx.addItems({
            id:props.id,
            name:props.name,
            price:props.price,
            amount:amount
        });
    }
    return (
        <li className={classes.meal} id={props.key}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealForm id={props.id} onAddedItem={addItemHandler}/>
            </div>
        </li>
    )

}

export default MealItems;
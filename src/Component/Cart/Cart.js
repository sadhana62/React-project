import React, { useContext, useState } from 'react';
import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import CartContext from '../../store/Cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = (props) => {
    const [isForm, setisForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length > 0;
    const ctxTotalAmount = `${cartCtx.totalAmount}`;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItems({ ...item, amount: 1 })
    }
    const formHandler = () => {
        setisForm(true);
    }
    const checkoutFormHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-request-dc716-default-rtdb.firebaseio.com/Orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const actionBtns = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onChange}>Close</button>
        {hasItems && <button className={classes.button} onClick={formHandler}> Order</button>}
    </div>
    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = (
        <React.Fragment>
          <p>Successfully sent the order!</p>
          <div className={classes.actions}>
          <button className={classes.button} onClick={props.onChange}>
            Close
          </button>
        </div>
        </React.Fragment>
      );
   
    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) =>
        (
            <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}

            />
        ))
        }
    </ul>
     const modalContent = (
        <React.Fragment>
               {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{ctxTotalAmount}</span>
            </div>
            {isForm && <Checkout onCancel={props.onChange} onValidSubmit={checkoutFormHandler} />}
            {
                !isForm && actionBtns
            }
        </React.Fragment>
    )
    return (
    
        <Modal onbackdropClick={props.onChange}>
             {!isSubmitting && !didSubmit && modalContent}
             {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}

        </Modal>
    );
}

export default Cart;
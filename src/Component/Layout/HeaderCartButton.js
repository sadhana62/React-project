import { useContext,useState,useEffect } from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/Cart-context'
const HeaderCartButton = (props)=>{
  const [isBtnHighLighted,setIsBtnHighLighted]=useState(false);
  const cartCtx = useContext(CartContext);
  const {items} = cartCtx;
  const numberOfItems = items.reduce((crtNumber,item)=>{
    return crtNumber + item.amount;
  },0)
  const btnclass = `${classes.button} ${isBtnHighLighted? classes.bump:''}`;
  useEffect(()=>{
    if(items.length === 0){
      return;
    }
    setIsBtnHighLighted(true);
   const timer =setTimeout(()=>{
    setIsBtnHighLighted(false);
    },3000);
    return ()=>{
    clearTimeout(timer)
      };
    
  },[items]);
  return(
    <button className={btnclass} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon></CartIcon>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfItems}</span>
    </button>
  )
}

export default HeaderCartButton
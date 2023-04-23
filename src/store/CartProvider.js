import { useReducer } from "react";
import CartContext from "./Cart-context";
const defaultCartContent = {
    items:[],
    totalAmount:0
}
const reducerHandler = (state,action) =>{
  if(action.type === 'ADD'){
    let exsitingItemIdx = state.items.findIndex(item=>item.id === action.item.id);
    let exsitingCartItem = state.items[exsitingItemIdx];
    let updatedItems;
    if(exsitingCartItem){
        let updatedItem;
      
        updatedItem={...exsitingCartItem,amount:exsitingCartItem.amount+action.item.amount}
        updatedItems=[...state.items];
        updatedItems[exsitingItemIdx]=updatedItem;

    }else{
        updatedItems = state.items.concat(action.item);
    }
    const updatetedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return ({
        items:updatedItems,
        totalAmount:updatetedTotalAmount,
    })
  }
  if (action.type === 'REMOVE') {
    let exsitingItemIdx = state.items.findIndex(item=>item.id === action.id);
    let exsitingCartItem = state.items[exsitingItemIdx];
    let updatedItems;
    const updatetedTotalAmount = state.totalAmount - exsitingCartItem.price;
    if (exsitingCartItem.amount === 1){
        updatedItems = state.items.filter(item => item.id !== action.id);
    }else{
        const updatedItem = {...exsitingCartItem,amount:exsitingCartItem.amount -1};
        updatedItems = [...state.items];
        updatedItems[exsitingItemIdx] = updatedItem;
    }
    return{
        items:updatedItems,
        totalAmount:updatetedTotalAmount
    }
  }
  if (action.type === 'CLEAR') {
    return defaultCartContent;
  }
  return defaultCartContent;
}
const CartProvider = (props)=>{
    const [cartItem,setDispatchCartItem]= useReducer(reducerHandler,defaultCartContent);
    const addItemHandler = (item)=>{
        setDispatchCartItem({type:'ADD',item:item})
    };

    const removeItemHandler = (id)=>{
         setDispatchCartItem({type:'REMOVE',id:id})
    };
    const clearCartHandler = () => {
        setDispatchCartItem({type: 'CLEAR'});
      };
    const cartContext = {
        items:cartItem.items,
        totalAmount:cartItem.totalAmount,
        addItems:addItemHandler,
        removeItem:removeItemHandler,
        clearCart: clearCartHandler
    }
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;
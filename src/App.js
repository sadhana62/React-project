import React, {Fragment, useState} from "react";
import Header from "./Component/Layout/Header";
import Meals from "./Component/Meals/Meals";
import Cart from "./Component/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [isCartShown ,setIsCartShown] = useState(false);

  const showCartHandler = ()=>{
    setIsCartShown(true);
  }

  const hideCartHandler = ()=>{
    setIsCartShown(false)
  }
  return (
   <CartProvider>
    {isCartShown && <Cart onChange={hideCartHandler}/>}
    <Header onCartClick={showCartHandler}/>
    <main>
      <Meals />
    </main>
   </CartProvider>
  );
}

export default App;

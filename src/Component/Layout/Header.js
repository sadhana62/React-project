import React ,{Fragment} from "react";
import mealImage from '../../assest/images/meals.jpg';
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props)=>{
  return (
   <Fragment>
    <header className={classes.header}>
        <h1>Food Web</h1>
        <HeaderCartButton onClick={props.onCartClick}/>
    </header>
    <div className={classes['main-image']}>
        <img src={mealImage} alt="delicous food item"/> 
    </div>
   </Fragment>
  )
}

export default Header
import { useState,useRef } from 'react';
import classes from './MealForm.module.css';
import Input from '../../UI/Input';
const MealForm = (props)=>{
  const [isInputValid,setIsInputValid] = useState(true);
  const inputRef = useRef()
  const onSubmitHandler = (event) =>{
   event.preventDefault();
   const enteredItem = inputRef.current.value;
   const enteredItemNumber = +enteredItem;
   if(enteredItemNumber.length === 0 || enteredItemNumber < 1 || enteredItemNumber > 5){
    setIsInputValid(false);
    return;
   }else{
    setIsInputValid(true);
    console.log(enteredItem);
    props.onAddedItem(enteredItemNumber);
   }
  }
  return(
    <form className={classes.form} onSubmit={onSubmitHandler}>
        <Input
         ref={inputRef}
         id='amount'
         label='Amount'
         input={{
            id: 'amount_' + props.id, // this changed!
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
        }}
        />
        <button>+ Add</button>
        {!isInputValid && <p>Enter a Valid Input (1-5)</p>}
    </form>
  )
}

export default MealForm
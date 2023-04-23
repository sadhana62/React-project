import MealsSummary from "./MealsSummary";
import AvailableMeal from "./AvailableMeal";
import { Fragment } from "react";
const Meals = ()=>{
   return(
    <Fragment>
        <MealsSummary />
        <AvailableMeal />
    </Fragment>
   )
}

export default Meals
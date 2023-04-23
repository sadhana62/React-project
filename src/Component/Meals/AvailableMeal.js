import { useEffect, useState } from 'react';
import classes from './AvailableMeal.module.css';
import MealItems from './MealItems/MealItems';
import Card from '../UI/Card';
const AvailableMeal = () => {
  const [meals, setMeals] = useState([]);
  const [isloading,setIsloading] = useState(false);
  const [httpsError, setHttpError] = useState();
  useEffect(() => {
    const getFoodFromDB = async () => {
      setIsloading(true);
      try {
        const response = await fetch('https://react-http-request-dc716-default-rtdb.firebaseio.com/Foods.json');
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Something went Wrong!!!');
        }
        const DUMMY_MEALS_DB = [];
        for (const key in data) {
          let foodObj = {}
          foodObj.id = key;
          foodObj.name = data[key].name;
          foodObj.price = data[key].price;
          foodObj.description = data[key].description;
          DUMMY_MEALS_DB.push(foodObj);
        }
        setMeals(DUMMY_MEALS_DB);
        setIsloading(false);
      } catch (err) {
        setHttpError(err.message);
        console.log(err.message);
      }
    }
    getFoodFromDB();
  }, []);
  if (httpsError) {
    return (
      <section className ={classes.error}>
        <p>{httpsError}</p>
      </section>
    )
  }
  if (isloading) {
    return (
      <section className ={classes.loading}>
        <p>Loading...</p>
      </section>
    )
  }
  const mealList = meals.map((meal) => {
    return (
      <MealItems
        name={meal.name}
        description={meal.description}
        price={meal.price}
        id={meal.id}
        key={meal.id}
      >
      </MealItems>
    )

  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealList}
        </ul>
      </Card>
    </section>
  )

}

export default AvailableMeal
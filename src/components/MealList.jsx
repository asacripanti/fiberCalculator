import React, { useState, useEffect} from "react";
import axios from "axios";

export default function MealList(){

    const [meals, setMeals] = useState([]);

    useEffect(() => {
      // Fetch data from the server when the component mounts
      axios.get('/api/meal')
        .then(response => {
          setMeals(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching meal:', error);
        });
    }, []);

    return(
        <div>
          <h2>Meal List</h2>
          {/* <ul>
        {meals.map(meal => (
          <li key={meal.id}>
            {meal.name} - Fiber: {meal.fiber_amount}
          </li>
        ))}
      </ul> */}
        </div>
    );
}

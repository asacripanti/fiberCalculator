import React from "react";
import axios from "axios";

export default function MealPlanner(remainingFiber){
    const [mealFormData, setMealFormData] = React.useState(
        {
            numberOfMeals: 0,
            numberOfSnacks: 0
        }
    )

    let totalMealsAndSnacks = parseInt(mealFormData.numberOfMeals) + parseInt(mealFormData.numberOfSnacks);
    let avgFiberMeal = remainingFiber.remainingFiber / totalMealsAndSnacks;

    function handleSubmit(event){
        event.preventDefault()
        console.log('Submit!');
        console.log(parseInt(mealFormData.numberOfMeals) + parseInt(mealFormData.numberOfSnacks));
        console.log(remainingFiber.remainingFiber);
        console.log(avgFiberMeal);
        console.log(totalMealsAndSnacks);

        axios.get('http://localhost:3000/api/meal/avgFiber')
        .then(response => {
          // Handle the response here
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error fetching meals:', error);
        });
    }
    function handleChange(event){
        const {name, value} = event.target
        setMealFormData(prevFormData => {
            return{
                ...prevFormData,
                [name]: value
            }
        })
    }

    

   

    const id = React.useId()
    return(
        <div>
            <h3>How many meals and/or snacks left in the day?</h3>
            <form onSubmit={handleSubmit}>
                <section className="inputSection">
                    <label className="numberOfMealsLabel" htmlFor={id + "-numberOfMeals"}>Number of meals</label>
                    <input
                        type="number"
                        name="numberOfMeals"
                        value={mealFormData.numberOfMeals}
                        className="numberOfMealsInput"
                        id={id + "-numberOfMeals"}
                        onChange={handleChange}
                    />

                    <label className="numberOfSnacksLabel" htmlFor={id + "-numberOfSnacks"}>Nuber of snacks </label>
                    <input 
                        type="number"
                        name="numberOfSnacks"
                        value={mealFormData.numberOfSnacks}
                        className="numberOfSnacksInput"
                        id={id + "-numerOfSnacks"}
                        onChange={handleChange}

                    />
                    </section>
                

            <button className="submitBtn">Confirm</button>
            </form>
        </div>
    )
}
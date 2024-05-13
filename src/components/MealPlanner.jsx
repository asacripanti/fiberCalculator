import React from "react";
import axios from "axios";

export default function MealPlanner(remainingFiber){
    const [mealFormData, setMealFormData] = React.useState(
        {
            numberOfMeals: 0,
            numberOfSnacks: 0
        }
    )

    const [mealData, setMealData] = React.useState(null);
    const [nextMeal, setNextMeal] = React.useState(null);
    const [plannedMeals, setPlannedMeals] = React.useState([]);
    const [plannedFiber, setPlannedFiber] = React.useState(0);
    const [mealsLeft, setMealsLeft] = React.useState(mealFormData.numberOfMeals);
    const [addNextMealBtn, setNextMealBtn] = React.useState(null);

    let totalMealsAndSnacks = parseInt(mealFormData.numberOfMeals);
    let avgFiberMeal = remainingFiber.remainingFiber / totalMealsAndSnacks;
    let fiberEndOfDay = plannedFiber - remainingFiber.remainingFiber;

    function handleSubmit(event){
        event.preventDefault()
        console.log('Submit!');
        console.log(parseInt(mealFormData.numberOfMeals) + parseInt(mealFormData.numberOfSnacks));
        console.log(remainingFiber.remainingFiber);
        console.log(avgFiberMeal);
        console.log(totalMealsAndSnacks);
        
        setNextMeal(prevMeal => !prevMeal);
        setMealsLeft(prevMealCount => mealFormData.numberOfMeals);

        axios.get(`http://localhost:3000/api/meal/avgFiber?avgFiberMeal=${avgFiberMeal}`)
        .then(response => {
          // Handle the response here
          setMealData(response.data);
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

    function addMeal(meal){
        setPlannedMeals(prevMeals => [...prevMeals, meal]);

        // Update planned fiber amount
        setPlannedFiber(prevFiber => parseInt(prevFiber) + parseInt(meal.fiber_amount));

        setNextMeal(prevMeal => !prevMeal);
        setMealsLeft(prevMealCount => prevMealCount - 1);
        setNextMealBtn(prevMealBtn => !prevMealBtn);
    }

    function fiberToGoQuery(){
        if(mealsLeft > 0){
            axios.get(`http://localhost:3000/api/meal/avgFiber?avgFiberMeal=${avgFiberToGoMeal}`)
            .then(response => {
              // Handle the response here
              setMealData(response.data);
              setNextMeal(prevMeal => !prevMeal);
              setNextMealBtn(prevButton => !prevButton);
              console.log('Response:', response.data);
            })
            .catch(error => {
              console.error('Error fetching meals:', error);
            });
        }
        else{
            alert("No more meals left!");
        }

    }

    function removeMeal(index) {
        setPlannedMeals(prevMeals => {
            // Create a copy of the plannedMeals array
            const updatedMeals = [...prevMeals];
            // Remove the meal at the specified index
            updatedMeals.splice(index, 1);
            return updatedMeals;
        });
    
        // Update planned fiber amount
        setPlannedFiber(prevFiber => {
            // Subtract the fiber amount of the removed meal
            return prevFiber - plannedMeals[index].fiber_amount;
        });

        setMealsLeft(prevMeal => prevMeal + 1);
    }
    

    let fiberToGo = remainingFiber.remainingFiber - plannedFiber;
    let avgFiberToGoMeal = fiberToGo / mealsLeft;
    

   

    const id = React.useId()
    return(
        <div className="mealPlannerShell">
            <div className="mealPlannerTopShell">
                <section className="mealPlannerTop">
                    <span className="mealPlannerTopText">Meals left: {mealsLeft}</span>
                    <span className="mealPlannerTopText">{fiberToGo > 0 ? "Fiber left: " + fiberToGo + "g" : "You did it!, you're " + fiberEndOfDay + "g  over the daily goal!" }</span>
                </section>
                <section className="mealPlannerMiddle">
                <ul className="mealPlannerPlannedMeals">
                        <li className="mealPlannerPlannedFiber">Planned Fiber: {plannedFiber}g</li>
                        {plannedMeals.map((meal, index) => (
                        <li className="mealPlannerMealItems" key={index}>{meal.name} - Fiber: {meal.fiber_amount}g  <button className="mealPlannerDeleteBtn" onClick={() => removeMeal(index)}>X</button></li>
                        ))}
                        {addNextMealBtn && <button className="mealPlannerAddNextMealBtn" onClick={fiberToGoQuery}>Add next meal</button>}
                    </ul>
                </section>
                <section className="mealPlannerBottom">
                    <form className="mealPlannerForm" onSubmit={handleSubmit}>
                        <section className="inputSection">
                            <label className="numberOfMealsLabel" htmlFor={id + "-numberOfMeals"}>Number of meals</label>
                            <input
                                type="number"
                                name="numberOfMeals"
                                value={mealFormData.numberOfMeals}
                                className="numberOfMealsInput"
                                id={id + "-numberOfMeals"}
                                onChange={handleChange}
                                min="0"
                            />
                            <button className="mealPlannerSubmitBtn">+</button>
                        </section>
                    </form>
                </section>
            </div>
            <br></br>
            <div className="mealDataShell">
                   {nextMeal && <ul className="mealPlannerMealSuggestions">
                        {mealData && mealData.map(meal => (
                            <li className="mealDataMeals" key={meal.id}>
                                <span mealDataMealName>{meal.name} - <span className="mealDataFiberAmount"> Fiber: {meal.fiber_amount}g</span> </span><button className="mealDataBtn" onClick={() => addMeal(meal)}>+</button>
                            </li>
                        ))}
                    </ul>}
            </div>
        </div>

    )
}
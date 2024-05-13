import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, API_URL } from "../config";

export default function FoodSearch({ updateTotalFiber }){
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.get(`${API_URL}?query=${query}`,{
                headers: {
                    'X-Api-Key': API_KEY
                }
            });
            setSearchResult(prevResults => [...prevResults, {
                foodName: query,
                fiberAmount: response.data[0]?.fiber_g
              }]); 
        } catch(error){
            setError(error);
        }

    };

    useEffect(() => {
        updateTotalFiber(searchResult.reduce((total, result) => total + (result.fiberAmount || 0), 0));
      }, [searchResult]);


      function removeSearchResult(index) {
        setSearchResult(prevMeals => {
            // Create a copy of the plannedMeals array
            const updatedMeals = [...prevMeals];
            // Remove the meal at the specified index
            updatedMeals.splice(index, 1);
            return updatedMeals;
        });
    }  
    const id = React.useId()
    const colorWheel = ["#5CC8FF", "#D0FFD6", "#F7B2BD"];
    const color = colorWheel[1];

    return(
        <div>
{            searchResult && (
                <div className="resultsDiv">
                    <ul>
                        {searchResult.map((result, index) => (
                            <li style={{color: color}} className="foodSearchFoodItem" key={index}>
                               Food: {result.foodName} Fiber: {result.fiberAmount}g <button className="foodSearchFoodEatenDeleteBtn" onClick={() => removeSearchResult(index)}>X</button>
                            </li>
                         ))}
                           <li>
                                {/* Total Fiber: {searchResult.reduce((total, result) => total + (result.fiberAmount || 0), 0)} */}
                            </li>
                    </ul>
                </div>
            )}
            {error && <p>Error: {error.message}</p>}
            <form className="foodsEatenForm" onSubmit={handleSubmit}>
                <label className="foodsEatenLabel" htmlFor={id + "-foodsEaten"}>What have you eaten today?</label>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Enter food/drink"    
                    name="foodsEaten"
                    className="foodSearchFoodEatenInput"
                />
                <button className="foodSearchSubmitBtn" type="submit">+</button>
            </form>
        </div>
   
    )
}
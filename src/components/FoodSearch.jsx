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
            // setSearchResult(prevResults => [...prevResults, response.data[0]?.fiber_g]);
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
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Enter food/drink"    
                />
                <button type="submit">Submit</button>
            </form>
            {searchResult && (
                <div className="resultsDiv">
                    <ul>
                        {searchResult.map((result, index) => (
                            <li key={index}>
                               Food: {result.foodName} Fiber: {result.fiberAmount}
                            </li>
                         ))}
                           <li>
                                {/* Total Fiber: {searchResult.reduce((total, result) => total + (result.fiberAmount || 0), 0)} */}
                            </li>
                    </ul>
                </div>
            )}
            {error && <p>Error: {error.message}</p>}
        </div>
   
    )
}
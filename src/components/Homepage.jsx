import React, { useState, useEffect } from "react";
import axios from "axios"
import { API_KEY } from "../config"
import { API_URL } from "../config"
import FoodSearch from "./FoodSearch";
import MealList from "./MealList";
import MealPlanner from "./MealPlanner";

export default function Homepage(){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [totalFiber, setTotalFiber] = useState(0);

    const updateTotalFiber = (fiberAmount) => {
      setTotalFiber(prevTotal => fiberAmount);
    };

    let remainingFiber = 25 - parseInt(totalFiber);
   

    



    return(
      <div>
        <h1 className="homepageTitle">Fiber Calculator</h1>
        <h2>Daily Fiber Goal: 25-30g</h2>
        <h2>Current Fiber {totalFiber.toFixed(1)}g</h2>

        <section>
          <h3>What have you eaten today?</h3>
          <FoodSearch updateTotalFiber={updateTotalFiber} />
          <div className="foodEaten">

          </div>
        </section>
        {/* <MealList /> */}
        <h2>{remainingFiber}g fiber left!</h2>
        <MealPlanner remainingFiber={remainingFiber}/>
      </div>
    )
}








    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get(`${API_URL}?query=1lb brisket and fries`, {
    //             headers: {
    //                 'X-Api-Key': API_KEY
    //             }
    //         });
    //         setData(response.data);
    //       } catch (error) {
    //         setError(error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);


    {/* <h1>{JSON.stringify(data)}</h1> */}
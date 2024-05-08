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
   
    const colorWheel = ["#5CC8FF", "#D0FFD6", "#F7B2BD", "#464E47"];
    
    



    return(
      <div className="homePageShell">
        <h1 className="homePageTitle">Fiber Calculator</h1>
        <section className="homePageFiberStats">
          <h2 className="homePageDailyFiberGoal">Daily Fiber Goal: 25-30g</h2>
          <h2 className="homePageCurrentFiber">Current Fiber <span className="homePageDynamicCurrentFiber" style={{
             color: totalFiber < 15 ? 'red' :
                    totalFiber < 25 && totalFiber >= 15 ? 'orange' :
                    'green' }}>{totalFiber.toFixed(1)}</span>g</h2>
        </section>
        <section className="homePageFormShell">
          <FoodSearch updateTotalFiber={updateTotalFiber} />
        </section>
        <br></br>
        <section className="homePageMealPlannerShell">
          <MealPlanner remainingFiber={remainingFiber}/>
        </section>       
        {/* <section className="homePageMealDataShell">
          
        </section> */}
      </div>
    )
}



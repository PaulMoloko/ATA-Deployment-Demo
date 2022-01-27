import React, { useEffect, useState } from 'react';
import routes from '../../../routes';
import "../AdminDashboard/Main.css";
import axios from "axios";
axios.defaults.withCredentials=true

const Main=()=>{

    const [name,setName] = useState()
   

    useEffect( () => 
    {
        axios.get("http://localhost:51153/api/Authenticate/User").then((response) => {
          setName(response.data);
        });
      }, []);
    
      if (!name) return null;


    return(
        <main>

<div className = "main__container">
                <div className = "main__title">

                    <div className = "main__greeting">
                        <h1>Welcome {name.FirstName} To The Assessment Tooling Application. </h1>
                        <h3>Review bookings and Set dates </h3>
                    </div>
                    <div>
                    
                        </div>

                </div>
            </div> 
            <div className="main__cards">
                <div className="card2">
                 <div className="sidebar__link">
                    <div className="card_inner">
                     <i className="fa  fa-list fa-5px"></i>
                        <a href={routes.Report}>View Reports</a>
                        <span className="font-bold text-title">  578</span>

                    </div>
                 </div>
                    
                </div>
                <div className="cardd">
                 <i className="fa  fa-list fa-5px"></i>
                 <a href={routes.UpdateRequest}>Update Requests</a>
                    
                </div>
            </div>
        </main>
    )

}

export default Main;
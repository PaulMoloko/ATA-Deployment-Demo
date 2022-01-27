import React, { useEffect, useState } from 'react';
import routes from '../../../routes';
//import "./DashboardMain.css";
import axios from "axios";
axios.defaults.withCredentials=true

const DashboardMain=()=>{

    
const [name,setName] = useState()
   

useEffect( () => 
{
    axios.get("http://localhost:51153/api/Authenticate/User").then((response) => {
      setName(response.data);
    });
  }, []);

  if (!name) return null;

/*{
        (
            async () =>{
               await axios.get(
                    "http://localhost:51153/api/Authenticate/User",{
                    headers: {   
                        'content-type': 'application/json',
                        'Set-Cookie': 'JWT'
                      }}
                     
                  ).then((response) => {
                        setName(response.data);
                  });
                  // set the state of the user
                 }
        )();
    });*/

    return(
        <main>
            <div className = "main__container">
                <div className = "main__title">

                    <div className = "main__greeting">
                        <h1>Welcome {name.FirstName} To The Assessment Tooling Application. </h1>
                        <h3>Schedule a Booking</h3>
                    </div>
                    <div>
                    
                        </div>

                </div>
            </div> 

            <div className="main__cards">
                <div className="card">
                    <i className="fa fa-user-o fa-2x text-lightblue"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Total Bookings</p>
                        <span className="font-bold text-title">578</span>
                    </div>
                </div>

                </div>
        </main>
    )
}

export default DashboardMain;
import React from 'react';
//import Card from "@material-ui/core/Card";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import "./DashboardMain.css";


const Main=()=>
{
    return(
        <main>
            <div className = "main__container">
                <div className = "main__title">

                    <div className = "main__greeting">
                        <h1>BMW Bookings</h1>
                        <p>Welcome to the clientside Dashboard</p>
                    </div>

                </div>
            </div>
            
            <div className="main__cards">
                <div className="card">
                    <i className="fa fa-user-o fa-2x text-lightblue"></i>
                    <div className="card_inner">
                        
                        <CardHeader> LIASONS </CardHeader>
                        <p className="text-primary-p">Total Bookings</p>
                        <span className="font-bold text-title">578</span>
                        
                    </div>
                    
                </div>

                <div className="card">
                    <i className="fa fa-updates fa-2x text-green"></i>
                    <div className = "card_inner"></div>

                        <p className="text-primary-p">Update Requests</p>
                    </div>
                </div>

        </main>
    )
}

export default Main;
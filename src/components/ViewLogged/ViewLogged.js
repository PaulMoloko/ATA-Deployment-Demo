import React from 'react';
import { useState } from 'react';

import "./ViewLogged.css";
//import Main from "../../components/main/DashboardMain";
//import Navbar from '../../components/navbar/navbar';
//import Sidebar from './components/sidebar/sidebar';
//import ClientDash from '../../ClientDashBoardApp';

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


const ViewLogged = () =>
{
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar=() =>
  {
    setSidebarOpen(true);
  }

  const closeSidebar=()=>
  {
    setSidebarOpen(false);
  }

  return (
    <div className="container">
      <div className = "main__title">
         <div className = "main__greeting">
            
            <h1>VIEW LOGGED BOOKINGS</h1>
            <p>Details on every booking</p>
            
          </div>
        </div>
    

    <div className="main__cards">

      <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Liason Info</p>
                <span className="font-bold text-title">578</span>

            </div>
        </div>

      <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Retailer Name</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Booking Organiser</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Liason to receive Report</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Liason to conduct Invoice</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>



      <div className="card">
        <i className="fa fa-updates fa-2x text-green"></i>
          <div className = "card_inner"></div>

            <p className="text-primary-p">Applicant Info</p>

        </div>
      </div>


      <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Current Date</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Preferred Date of Booking</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Applicant CV</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Name and Surname</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Email Address</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Contact Number</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>



        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Assessment Info</p>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Assessment Type</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Brand Applied For</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>

        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue"></i>
            <div className="card_inner">

                <p className="text-primary-p">Position Shortlisted For</p>
                <span className="font-bold text-title">-</span>

            </div>
        </div>
        
    </div>
  );
}

export default ViewLogged;
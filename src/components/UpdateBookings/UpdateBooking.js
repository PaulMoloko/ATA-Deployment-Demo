import React from 'react';
import { useState } from 'react';

import "./UpdateBooking.css";
//import Main from "../../components/main/DashboardMain";
//import Navbar from '../../components/navbar/navbar';
//import Sidebar from './components/sidebar/sidebar';
//import ClientDash from '../../ClientDashBoardApp';

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


const UpdateBookings = () =>
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


        
    </div>
  );
}

export default UpdateBookings;
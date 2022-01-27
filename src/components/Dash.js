import React from 'react'
import { useState } from "react";
import Main from '../Assets/main/Main';
import Navbar from '../Assets/navbar/Navbar';


import Sidebar from "../Assets/sidebar/Sidebar";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Update from "./pages/Updateprofile";
import Reports from "./pages/Reports";
import View from "./pages/viewreports";
import Assessment from "./pages/updateAss";
import { updateLayoutMeasurement } from 'framer-motion/types/render/dom/projection/utils';
//import "./App.css";

const Dash=() =>{

  const [sidebarOpen, setSidebarOpen]= useState(false);

  const openSidebar=() =>{
    setSidebarOpen(true);
  }

  const closeSidebar=()=>{
    setSidebarOpen(false);
  }
  return (
    
    <div className="container">
      
    <Router>
     <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/> 
     <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
     
     <Switch>
       
    <Route path='/'  component={Main}/>
    <Route path='/main'  component={Main}/>
    <Route path='/Update' component={Update}/>
    <Route path='/Reports' component={Reports}/>
    <Route path='/View' component={View}/>
    <Route path='/Assessment' component={Assessment}/>
    <Redirect to='/main' exact component={Main}/>
    <Main/>
    <Reports/>
     </Switch>
  </Router>
    
    </div>
    
  );
}

export default Dash;
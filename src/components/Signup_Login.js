import React, { Component }  from 'react';
import styled from "styled-components";
import { AccountBox } from "./accountBox";
import { AccountBox2 } from './accountBox2';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import route from 'color-convert/route';
import { LoginForm } from './accountBox/loginForm';
import { SignupForm } from './accountBox/SignupForm';
import RouteWithProps from '../Shared/routes/RouteWithProps'
import routes from '../routes';
import ContactUs from '../components/pages/ContactUs'
import {Access} from '../components/accountBox/access'



const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Signup_Login() {
  return (

   
    
    <AppContainer>
       <Switch>
            <RouteWithProps exact path={routes.Signup_Login} component={AccountBox}/>
            <RouteWithProps exact path={routes.AdminSignup} component={AccountBox2}/>
            <RouteWithProps exact path={routes.ContactUs} component={ContactUs}/>
            <RouteWithProps exact path={routes.login} component={Access}/>
      

        </Switch>
  </AppContainer>
      


  );
}

export default Signup_Login;
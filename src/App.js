import React from 'react'

//import './App.css';
import Home from './components/pages/Home';
import Signup_Login from './components/Signup_Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import AuthLayout from './Shared/Layout/AuthLayout';
import routes from './routes';
import ClientLayout from './Shared/Layout/ClientLayout';
import ClientDashboard from './components/pages/ClientDashboard/Index';
import { createBrowserHistory } from "history";
import AdminDashboard from './components/pages/AdminDashboard/index';
import Main from './components/pages/AdminDashboard/Main';
import AdminLayout from './Shared/Layout/AdminLayout';

//calling all pages involved
const pages = [
  // Public pages
  {
    exact:true,
    path: routes.home,
    component:Home,
    layout: AuthLayout
  },
  {
    exact: false,
    path: routes.Signup_Login,
    component: Signup_Login,
    layout: AuthLayout
    
  },

{
    exact: false,
    path: routes.main,
    component:AdminDashboard,
    layout: AdminLayout
  },
  
  // Authenticated pages
 {
    exact: false,
    path: routes.Dashboard,
    component:ClientDashboard,
    layout:ClientLayout
  }

  
];


const App =()=> {
  const history=createBrowserHistory();
  return (
    
    <Router history={history}>

    <Switch>
      {pages.map(
        ({ exact, path, component: Component, layout: Layout }, index) => (
          <Route
            key={index}
            exact={exact}
            path={path}
            render={props => (
              <Layout history={props.history}>
                <Component {...props} />
              </Layout>
            )}
          />
        )
      )}
      
      {/* Or Uncomment below to use a custom 404 page */}
      {/* <Route component={NotFoundPage} /> */}
    </Switch>
  </Router>
     
  
  );
}

export default App;
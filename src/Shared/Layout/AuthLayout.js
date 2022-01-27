import React from 'react'
import Navbar from '../../components/nav/navbar'
import routes from '../../routes';

//const Landingpage=props=>{
    class AuthLayout extends React.Component {
        componentDidMount() {
            
            this.props.history.push(routes.login);
            // Fetch data for logged in user using token
          }
        
          onLogout = () => {
            // Remove token & other stored data
            localStorage.clear();
            this.props.history.push(routes.home);
          };
render(){
return(

    <div>
    <Navbar/>  
    {this.props.children}

    </div>


)

}
    }


export default AuthLayout;
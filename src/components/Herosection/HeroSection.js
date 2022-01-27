import React from 'react';
import '../App.css';
import Signup_Login from '../Signup_Login';
import  Button  from '../Button';
import './HeroSection.css';
import routes from '../../routes';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';


const HeroSection=props=> {
  
  
//opening dialog modal
  const [open, setOpen] = React.useState(false);
  
  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
  };
 
  

  return (
   
    
  
   <div className='hero-container'>


    <div stlye={{}}>
      
     
        <Dialog open={open} onClose={handleToClose}>
          <DialogTitle>{""}</DialogTitle>
            <DialogContent>
              <DialogContentText>
            Would you like to Register as?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to=  '/SignupLogin/Adminsignup'>
        <Button onClick={routes.AdminSignup} 
           style={{textTransform: 'none'}}   color="primary" autoFocus>
            Administrator
          </Button>
          </Link>
          <Link to= '/SignupLogin'>
          <Button onClick={routes.AdminSignup} 
          style={{textTransform: 'none'}}         color="primary" autoFocus>
            Retailer
          </Button>
          </Link>
          <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
    <div class="container">
      <span class="text1">ASSESSMENT BOOKING </span>

    </div>
    
     
      <div className='hero-btns'>

      
 
        <Button
        
          type=""
          children=""
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={handleClickToOpen}
            style={{ color: 'black'}}
            
          >
            
          Sign Up <i className='fas fa-user-plus' />
        </Button>

        
        <Link to=  '/SignupLogin/login'>
        <Button
        style={{ color: 'black'}}
        type=""
        children=""
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={routes.login}
        >
        Login <i className='fas fa-sign-in-alt' />
      </Button>
      </Link>
     
      </div>
    </div>
  );
}

export default HeroSection;
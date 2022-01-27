import React from 'react'
import axios from 'axios'

import { Alert } from 'react-st-modal';

const Logout =()=>{

    const [open, setOpen] = React.useState(true);
  
    const handleClickToOpen = () => {
      setOpen(true);
    };
    
    const handleToClose = () => {
      setOpen(false);
    };

return(

    <div stlye={{}}>
      
     
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"User Type"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you Sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to=  '/SignupLogin/Adminsignup'>
        <Button onClick={routes.AdminSignup} 
                  color="primary" autoFocus>
            YES
          </Button>
          </Link>
          <Link to= '/SignupLogin'>
          <Button onClick={routes.AdminSignup} 
                  color="primary" autoFocus>
            CANCEL
          </Button>
          </Link>
          
        </DialogActions>
      </Dialog>
    </div>

)
}

export default Logout;
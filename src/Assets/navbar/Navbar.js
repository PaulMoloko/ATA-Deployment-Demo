import React, { useContext, useState } from "react"; //added by paul
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import gijima from '../../components/images/gijima.png';
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import routes from '../../routes'
//import { AccountContext } from "../accountBox/accountContext";
//import { useContext } from "react";
//import { UpdateInfo } from "../../components/accountBox/UpdateInfo";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
    
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  
  },
  paper: {
    background: '#2E3B55'
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const view = Boolean(anchorEl);
 /* const { switchToUpdate } = useContext(AccountContext);//added swicthToUpdate*/


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
  };

  /*const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");*/

  /* playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };*/


  /*const switchToUpdate = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("updateinfo");
    }, 400);
  };*/

  const [name,setName] = React.useState(false)
  const [surname,setSurname] = React.useState(false)
   

React.useEffect( () => 
{
    axios.get("http://localhost:51153/api/Authenticate/User").then((response) => {
      setName(response.data);
      setSurname(response.data);
    });
  }, []);

  if (!name) return null;

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        style={{ background: '#35a4ba' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
          <img src={gijima}  width="125"/>
          </Typography>
          <div>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={view}
              onClose={handleClose}
            >
              <ListItemLink href={routes.updateprofile}>
              <MenuItem >Profile</MenuItem>
              </ListItemLink>
            </Menu>
          </div>
          <Grid item xs />
          <Grid item>
          {name.FirstName} {surname.LastName}
          <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
             
                <AccountCircle />
              
            </IconButton>
            
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        
        classes={{
          paper: classes.drawerPaper
        } 
      }
        
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItemLink href={routes.dashboard}>
        <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemLink>

        <ListItemLink href={routes.Schedule}>
        <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Schedule Booking" />
        </ListItemLink>

        <ListItemLink href={routes.View}>
        <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="View Booking" />
        </ListItemLink>

        
        <ListItemLink href={routes.home}>
        <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemLink>
          
        </List>
        <Divider />
      </Drawer>
     
    </div>
  );
}

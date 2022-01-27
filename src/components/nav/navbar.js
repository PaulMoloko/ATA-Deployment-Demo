import React,{useEffect,useState} from 'react'
import { BrowserRouter, Link } from 'react-router-dom';
import Button  from '../Button';
import '../nav/nav.css';
import { LoginForm } from '../accountBox/loginForm';
import avatar from "../../Assets/avatar.jpg"
import gijima from '../images/gijima.png'

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    
      <nav className='navbar'>
        <div className='navbar-container'>
        
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img width="125" height="60" padding="50px"  src={gijima} alt="gijima"/>
            <i class='' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
            
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
              
            </li>
            
            
            <li className='nav-item'>
              <Link
                to='/SignupLogin/ContactUs'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Contact us
              </Link>
            </li>

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to='/loginForm'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
             
            </li>
          </ul>
          
          
        </div>
      </nav>
    
  );
}

export default Navbar;

/*const Navbar = ({ sidebarOpen, openSidebar }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <a href="./about">About Us</a>
        <a href="#">Contact Us </a>
        <a className="active_link" href="#">
          User
        </a>
      </div>
      <div className="navbar__right">
      
      </div>
    </nav>
  );
};

export default Navbar;*/

/*
const Navbar=({sidebarOpen, openSidebar})=>{
    return(
        <nav className="navbar">
            <div className="nav_icon" onClick={()=> openSidebar()}>
                <i className="fa fa-bars"></i>
            </div>
            <div className="navbar__left">
                <a href="#">Home</a>
                <a href="#">Help</a>
                <a className="active_link" href="#">Admin</a>
            </div>
            <div className="navbar__right">
                <a href="#">
                    <i className="fa fa-search"></i>
                </a>
                <a href="#">
                    <i className="fa fa-clock-o"></i>
                </a>
                <a href="#">
                    <img width="30" src={avatar} alt="avatar"/>
                </a>
            </div>
        </nav>
    )
}
export default Navbar;
*/

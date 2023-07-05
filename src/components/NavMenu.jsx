import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import '../Styles/NavMenu.css';

 function NavMenu (props) {
  
  

  
    return (
            <Navbar
                color="secondary"
                dark>
                <NavbarBrand href="/">
                   SmartSearch
                </NavbarBrand>
            </Navbar>
    
    );
  }

  export default NavMenu;

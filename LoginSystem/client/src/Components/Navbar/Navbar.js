import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/Home" active>
                        Home
                    </NavLink>
                    <NavLink to="/Register" activeStyle>
                        Register
                    </NavLink>
                    <NavLink to="/Login" activeStyle>
                        Login
                    </NavLink>
                    
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;
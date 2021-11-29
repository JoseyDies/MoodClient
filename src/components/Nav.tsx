import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap'; //NavbarBrand,
import { Link } from 'react-router-dom';

const Sitebar = () => {
    return (
        <Navbar color="dark" dark expand="md">
            {/* <NavbarBrand href="/">
                Home
            </NavbarBrand> */}
            <Nav className="ml-auto">
                <NavItem>
                    <Link to="/" className="site-link">Home</Link>
                </NavItem>
                <NavItem>
                    <Link to="/mood" className="site-link">Mood Entry</Link>
                </NavItem>
                <NavItem>
                    <Link to="/goal" className="site-link">Goal Entry</Link>
                </NavItem>
                <NavItem>
                    <Link to="/resources" className="site-link">Resources</Link>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Sitebar;
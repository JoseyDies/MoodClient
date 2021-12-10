import React from 'react';
import { Navbar, Nav, NavItem, Button, Row } from 'reactstrap';
import { Link, Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Home from './Home/Home';
import Mood from './MoodEntries/Mood';
import Goal from './GoalEntries/Goal';
import Resources from './Resources/Resources';
import Admin from './Admin/AdminGetUsers';
import NotAuthorized from './Admin/NotAuthorized';




type propTypes = {
    token: string,
    clearToken: () => void,
    role: string,
    //firstName: string
}

const Sitebar = (props: propTypes) => {
    return (
        <div>
           
            <Navbar style={{ backgroundColor: "#004751", flexDirection: "row", justifyContent: "space-around"}} >
                <Nav className='m-auto'>
                    <NavItem >
                        <Link style={{ textDecoration: "none"}} to="/" className="site-link">Home</Link>
                    </NavItem>
                        
                    <NavItem>
                        <Link style={{ textDecoration: "none"}} to="/mood" className="site-link">Mood Entry</Link>
                    </NavItem>
                    <NavItem>
                        <Link style={{ textDecoration: "none"}}  to="/goal" className="site-link">Goal Entry</Link>
                    </NavItem>
                    <NavItem>
                        <Link style={{ textDecoration: "none"}}  to="/resources" className="site-link">Resources</Link>
                    </NavItem>
                    
                    {/* <NavItem>
                        <Link to="/admin" className="site-link">Admin</Link>
                    </NavItem> */}
                    {props.role === "admin" ? (
                        <NavItem>
                            <Link to="/admin" className="site-link">Admin</Link>
                        </NavItem>
                    ) : (<div></div>)}
                      <NavItem>
                        <Button className='logout' onClick={props.clearToken}>Logout</Button>
                    </NavItem>
                
                </Nav>
            </Navbar>
           
            <Switch>
                <Route exact path='/'>
                    <Home token={props.token} />
                </Route>
                <Route exact path='/mood'>
                    <Mood token={props.token} />
                </Route>
                <Route exact path='/goal'>
                    <Goal token={props.token} />
                </Route>
                <Route exact path='/resources'>
                    <Resources />
                </Route>
                <Route exact path='/notauthorized'>
                    <NotAuthorized />
                </Route>
                {/* {props.role === "admin" ? (
                <Route exact path='/admin'>
                    <Admin token={props.token} role={props.role} />
                </Route>
                ): (<div></div>)} */}

               {props.role === 'admin' ?
               <Route exact path="/admin"><Admin role={props.role} token={props.token}/></Route>
               : <Redirect from="/admin" to="/notauthorized" />
               }
            </Switch>
        </div>
    );
};

export default Sitebar;
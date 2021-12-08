import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'reactstrap';
import { Link, Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Home from './Home';
import Mood from './MoodEntries/Mood';
import Goal from './GoalEntries/Goal';
import Resources from './Resources/Resources';
import Admin from './Admin/AdminGetUsers';
import NotAuthorized from './Admin/NotAuthorized'

type propTypes = {
    token: string,
    clearToken: () => void,
    role: string
}

const Sitebar = (props: propTypes) => {
    return (
        <React.Fragment>
            <Navbar color="dark" dark expand="md">
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
                    <NavItem>
                        <Button className='logout' onClick={props.clearToken}>Logout</Button>
                    </NavItem>
                    {/* <NavItem>
                        <Link to="/admin" className="site-link">Admin</Link>
                    </NavItem> */}
                    {props.role === "admin" ? (
                        <NavItem>
                            <Link to="/admin" className="site-link">Admin</Link>
                        </NavItem>
                    ) : (<div>Your aren't an admin!</div>)}
               
                    

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
        </React.Fragment>
    );
};

export default Sitebar;
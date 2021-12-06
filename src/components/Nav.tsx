import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'reactstrap';
import { Link, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Mood from './MoodEntries/Mood';
import Goal from './GoalEntries/Goal';
import Resources from './Resources/Resources';

type propTypes = {
    token: string,
    clearToken: () => void
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
                </Nav>
            </Navbar>
            <Switch>
                <Route exact path='/'>
                    <Home token={props.token} />
                </Route>
                <Route exact path='/mood'>
                    <Mood token={props.token}/>
                </Route>
                <Route exact path='/goal'>
                    <Goal token={props.token}/>
                </Route>
                <Route exact path='/resources'>
                    <Resources />
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default Sitebar;
import React from 'react';
// import './App.css';
import Auth from '../Auth/Auth';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export interface AppProps {
}

export interface AppState {
    sessionToken: string

}

class Main extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            sessionToken: ''

        };
    }

    updateToken = (newToken: string) => {
        localStorage.setItem('token', newToken)
        console.log(newToken)
        this.setState({
            sessionToken: newToken
        })
    }


    protectedViews = () => {
        return localStorage.getItem('token') ? (
            <Home token={this.state.sessionToken} />
        ) : (
            <Auth updateToken={this.updateToken} />
        )
    }

    render() {

        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            {this.protectedViews()}
                        </Route>
                        {/* <Route exact path="/" component={ Home } />
                    <Route exact path="/mood" component={ Mood } />
                    <Route exact path="/goal" component={ Goal } />
                    <Route exact path="/chart" component={ Chart } />
                    <Route exact path="/resources" component={ Resources } /> */}
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }

}

export default Main;
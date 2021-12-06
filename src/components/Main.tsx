import React from 'react';
// import './App.css';
import Auth from '../Auth/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import Sitebar from './Nav';

export interface AppProps {
    
}

export interface AppState {
    sessionToken: string,
    

}


class Main extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            sessionToken: ""
           
        };
        this.clearToken = this.clearToken.bind(this);
        
    }

    updateToken = (newToken: string) => {
        localStorage.setItem('token', newToken)
        console.log(newToken)
        this.setState({
            sessionToken: newToken
        })
    }
//create variable local to this file, maybe "isAdmin". Would add another paramter to updateToken in addition to a newToken. Could set state to isAdmin after line 32. Pass that into sitebar. In sitebar, check to make sure role is admin. 

    clearToken = () => {
        localStorage.clear();
        this.setState({ 
            sessionToken: "" 
        });
    }

    protectedViews = () => {
        return localStorage.getItem('token') ? (
            <Router>
            <Sitebar token={this.state.sessionToken} clearToken={this.clearToken}  /> 
            {/* left side of equation address child component while right side what is created...here.  idk. come back */}
            
            </Router>
        ) : (
            <Auth updateToken={this.updateToken} />
        )
    }

    render() {

        return (
            <React.Fragment>
                  
                            {this.protectedViews()}
                    
                 
            </React.Fragment>
        )
    }

}

export default Main;
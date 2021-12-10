import React from 'react';
import Auth from './Auth/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import Sitebar from './Nav';


export interface AppProps {

}

export interface AppState {
    sessionToken: string,
    role: string,
    // firstName: string

}


class Main extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            sessionToken: "",
            role: "",
            // firstName: ""

        };
        this.clearToken = this.clearToken.bind(this);

    }

    updateToken = (newToken: string, role: string) => { //, firstName: string
        localStorage.setItem('token', newToken)
       
        console.log(newToken)
        this.setState({
            sessionToken: newToken,
            role: role,
            //firstName: firstName
            //left side lines up with what is being created in this file while the right side is what I want this variables content to be (in this case, will be that parameter)
        })
        console.log(this.state.role);
        
    }

    //create variable local to this file, maybe "isAdmin". Would add another paramter to updateToken in addition to a newToken. Could set state to isAdmin after line 32. Pass that into sitebar. In sitebar, check to make sure role is admin. 

    clearToken = () => {
        localStorage.clear();
        this.setState({
            sessionToken: "",
            role: "",
            //firstName: ""
        });
    }

    protectedViews = () => {
        return localStorage.getItem('token') ? (
            <Router>
                <Sitebar token={this.state.sessionToken} clearToken={this.clearToken} role={this.state.role} /> 
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
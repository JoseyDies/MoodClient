import React from 'react';
import Login from './Login';
import Register from "./Register";
import "./Auth.css"

export interface AuthProps {
    updateToken: Function
}
 
export interface AuthState {
    showLogin: boolean
}
 
class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = {
            showLogin: true
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle = (event: any) => {
        event.preventDefault();
        this.setState({showLogin: !this.state.showLogin})
    }
    render() {
        return (
          
            <div>
            {this.state.showLogin ? (
            <Register updateToken={this.props.updateToken} /> 
            ) : (
            <Login updateToken={this.props.updateToken} />  
            )}
            <div>
                {this.state.showLogin ? (
                    <button className = "Authbutton" onClick={this.handleToggle}>Already a member? Login here.</button>
                ) : (
                    <button className = "Authbutton" onClick ={this.handleToggle}>New here? Signup here!</button>
                )}
            </div>
        </div>
        )
    }
}

export default Auth;